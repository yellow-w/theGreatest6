document.addEventListener('DOMContentLoaded', init)
document.addEventListener('keydown',noEnterkey)

async function noEnterkey(e){
    if (e.keyCode === 13) {
        e.preventDefault();
      };
}

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    console.log('도착')

    let [,,,,idx] = location.pathname.split('/')
    const response = await axios.post(`showmodify/${idx}`)
    console.log(response)
    const {show_idx, show_category_idx, show_xrated, show_title, show_place, show_cast1, show_cast2, show_director,show_company,show_content,show_date,show_date_open} = response.data.result[0]
    
    splitTimestamp(show_date) //공연일
    console.log(showY)

    // ticketSplit = show_date_open.split('T')
    // ticketYMD = ticketSplit[0].split('-')
    // ticketY = ticketYMD[0]
    // ticketM = ticketYMD[1]
    // ticketD = ticketYMD[2]
    // ticketH = ticketSplit[1].slice(0,2)
    // console.log(show_date_open)

    // console.log(category,xrated,title,place,showCast1,showCast2,showDirector,showCompany,showContent,showMonth,showDate,showHour)

    //선택 드롭다운 메뉴 만드는 코드
    makeOption() 

    const modifyForm = document.querySelector('#modifyForm')
    modifyForm.addEventListener('submit',modifyFormHandler)
    async function modifyFormHandler(e){
        e.preventDefault()
        let category = document.querySelector('#category').value
        let xrated = document.querySelector('#xrated').value
        let title = document.querySelector('#title').value
        let place = document.querySelector('#place').value
        let showCast1 = document.querySelector('#showCast1').value
        let showCast2 = document.querySelector('#showCast2').value
        let showDirector = document.querySelector('#showDirector').value
        let showCompany = document.querySelector('#showCompany').value
        let showContent = document.querySelector('#showContent').value
        let showMonth = document.querySelector('#showMonth').value
        let showDate = document.querySelector('#showDate').value
        let showHour = document.querySelector('#showHour').value
        let ticketMonth = document.querySelector('#ticketMonth').value
        let ticketDate = document.querySelector('#ticketDate').value
        let ticketHour = document.querySelector('#ticketHour').value

        //sql 저장을 위해 따로 생성한 timestampShow와 timestampTicket
        let timestampShow = `${showY}-${showMonth}-${showDate}T${showHour}:00:00`
        let timestampTicket = `${ticketY}-${ticketMonth}-${ticketDate}T${ticketHour}:00:00`
        console.log('timestampShow : ',timestampShow)
        console.log('timestampTicket : ',timestampTicket)

        try{
            let option = {
                data : {show_idx,category,xrated,title,place,showCast1,showCast2,showDirector,showCompany,showContent,timestampShow, timestampTicket}
            }
            const responseRepost = await axios.post(`showview/${show_idx}`,option)
            console.log('---->',responseRepost)
        }
        catch(e){
            console.log(e)
        }
    }

    //선택 드롭다운 만드는 코드
    function makeOption(){
        //예매일
        const ticketMonth = document.querySelector('#ticketMonth')
        const ticketDate = document.querySelector('#ticketDate')
        const ticketHour = document.querySelector('#ticketHour')
        //공연일
        const showMonth = document.querySelector('#showMonth')
        const showDate = document.querySelector('#showDate')
        const showHour = document.querySelector('#showHour')

        //예매일, 공연일 생성
        makeDatelist(showMonth,showDate,showHour)
        makeDatelist(ticketMonth,ticketDate,ticketHour)
    }

    //드롭다운 만드는 함수
    function makeDatelist(month,date,hour){
        //달력배열을 만들 배열 선언
        let monthlist=[] 
        let datelist=[]
        let hourlist=[]
        
        for(let i=1; i<=12; i++){ monthlist.push(`${i}`) ;} //열두달 채워넣기
        for(let i=1; i<=31; i++){ datelist.push(`${i}`) ;} //31일 채워넣기
        hourlist = ['10','13','18'] //3회 공연

        monthlist.forEach(v=>{
            const newOption = document.createElement("option")
            newOption.text = `${v}`
            newOption.value = `${v}`
            month.options.add(newOption)
        })

        datelist.forEach(v=>{
            const newOption = document.createElement("option")
            newOption.text = `${v}`
            newOption.value = `${v}`
            date.options.add(newOption)
        })

        hourlist.forEach(v=>{
            const newOption = document.createElement("option")
            newOption.text = `${v}`
            newOption.value = `${v}`
            hour.options.add(newOption)
        })

        return month,date,hour
    }

    //timestamp 나눠서 year,month,date,hour 만드는 함수
    function splitTimestamp(timestamp){
        showSplit = timestamp.split('T')
        showYMD = showSplit[0].split('-')
        showY = showYMD[0]
        showM = showYMD[1]
        showD = showYMD[2]
        showH = showSplit[1].slice(0,2)
    }
}
