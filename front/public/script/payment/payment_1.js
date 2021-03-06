let seatIdx;
let accountIdx;
let point;
let pointNet;
let seatPrice;

document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/book/payment';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    const [, , , , rowIdx, numberIdx, showIdx] = location.pathname.split('/')


    const userInfo = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
    const { user } = userInfo.data.result;

    const answer = document.querySelectorAll('.answer input');
    const yes = document.querySelector('#yes');
    const pointCheckBox = document.querySelector('#pointCheckBox');
    let usePoint = document.querySelector('#usePoint');
    const use = document.querySelector('#use');

    answer.forEach(v => v.addEventListener('click', clickHandler));

    //클릭 시 포인트 사용 여부 체크
    function clickHandler() {
        if (yes.checked) {
            pointCheckBox.style.display = 'block';
        } else {
            pointCheckBox.style.display = 'none';
        }
    }

    //클릭 시 포인트 조회
    pointCheckBtn.addEventListener('click', pointCheckBtnhandler);
    async function pointCheckBtnhandler() {
        const usablePoint = document.querySelector('#usablePoint');
        const data = {
            userIdx: user.user_idx
        };
        const response = await axios.post('/checkPoint', data);
        pointNet = response.data.result.point_net;
        usablePoint.innerHTML = pointNet;
    }


    // 입금액 가져오기
    let ticketPrice = document.querySelector('#ticketPrice')
    try {
        const data = {
            rowIdx,
            numberIdx
        }
        const getPrice = await axios.post('/getSpecificSeat', data)
        seatIdx = getPrice.data.result.book_seat_idx
        seatPrice = getPrice.data.result.book_seat_price
        ticketPrice.innerHTML = seatPrice;
    } catch (e) {
        console.log('getPrice', e.message)
    }



    //입금액
    use.addEventListener('click', usePointHandler)

    function usePointHandler() {
        point = usePoint.value
        ticketPrice.innerHTML = seatPrice - point;
    }


    //결제 수단 입력
    let bank = document.querySelector('#bank')
    getbankInfo()     //선택 가능한 계좌 정보
    getDeadLine()   //마감기한


    //넥스트 버튼
    const next = document.querySelector('#next')
    next.addEventListener('click', moveToPayment_2Hanlder)

    function moveToPayment_2Hanlder() {
        try {
            if (yes.checked) {
                const bankIdx = bank.value
                if (point == undefined) point = 0;
                if (point > pointNet) {
                    ticketPrice.innerHTML = seatPrice;
                    throw new Error('가용 포인트 부족')
                }
                location.href = `/book/payment/payment_2/${seatIdx}/${showIdx}/${bankIdx}/${point}`
            } else {
                if (point == undefined) point = 0;
            }
        } catch (e) {
            console.log(e.message)
            alert('포인트를 확인해주세요.')
        }
    }
}


///은행 정보 클릭
async function getbankInfo() {
    try {
        const bankInfo = await axios.post('/getFullBankInfo', null)
        const account = bankInfo.data.result

        let option
        await account.forEach(v => {
            option = document.createElement('option')
            option.value = v.bank_idx;
            option.innerHTML = v.bank_account;
            bank.appendChild(option);
        })
    } catch (e) {
        console.log('/payment_1 getbankinfo', e.message)
    }
}

//마감 기한
const getDeadLine = _ => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const today = `${year}년 ${month}월 ${day}일 23시 59분`
    const deadLine = document.querySelector('#deadLine')
    deadLine.innerHTML = today
    return today;
}