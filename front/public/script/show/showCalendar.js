document.addEventListener('DOMContentLoaded', init)

async function init(e) {
    axios.defaults.baseURL = 'http://localhost:4001/show/program/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    console.log(e.target)

    //좌우이동 버튼, 연.월 버튼
    const btnLeft = document.querySelector('.left')
    const btnRight = document.querySelector('.right')
    const year_month = document.querySelector('.year-month')
    let dates = document.querySelector('.dates')
    let template = document.querySelector('.cal_temp')

    let clone = document.importNode(template.content,true)
    let btnDate = clone.querySelector('.date')
    let dotAdmin = clone.querySelector('.btnAdmin')
    let dotCumstomer = clone.querySelector('.btnCustomer')

    //클릭한 좌표 찾기
    const cal_day = document.querySelector('.cal_day')
    cal_day.addEventListener('click',cal_dayHandler)

    function cal_dayHandler(event){
        let alert = event.target
        console.log(alert)
    }

    //오늘의 정보를 알려주는 함수
    let today = new Date()
    let year = today.getFullYear() // 올해
    let month = today.getMonth() // 이번달
    let date = today.getDate() //오늘

    createCalendar(today)

    //달력 그리기
    function createCalendar(today){
        dates.innerHTML=''

        // 새로 정보를 받아서 사용할 연도/달
        year = today.getFullYear()
        month = today.getMonth()
        date = today.getDate()
        let day

        let prevMonth = new Date(year, month, 0) //저번달 마지막날 정보 객체
        let prevLastDate = prevMonth.getDate()  //저번달 마지막 날
        let prevLastDay = prevMonth.getDay()  //저번달 마지막 요일
        let nowFirstDay = prevLastDay + 1 //이번달 시작하는 요일

        let nowMonth = new Date(year, month+1, 0) //이번달 마지막날 정보 객체
        let nowLastDate = nowMonth.getDate() //이번달 마지막 말
        let nowLastDay = nowMonth.getDay() //이번달 마지막 요일

        calMonth = monthThreeWord(month+1)
        year_month.innerHTML = `${calMonth} ${year}`

        //이번달이 일요일로 시작하지 않을 경우
        if(nowFirstDay!==0){
        for(let i=(prevLastDate+1) - nowFirstDay; i<=prevLastDate; i++){
            let clone = document.importNode(template.content,true)
            let btnDate = clone.querySelector('.date')
            day = (new Date(year,month,i)).getDay()
            btnDate.setAttribute("value",`${year}/${month}/${i-1}/${day}_0/0`)
            btnDate.setAttribute("class","date prev")
            btnDate.innerHTML+=i
            dates.appendChild(clone)
        }
        for(let i=1; i<=nowLastDate; i++){
            let clone = document.importNode(template.content,true)
            let btnDate = clone.querySelector('.date')
            btnDate.innerHTML+='<div>'+'</div>'
            day = (new Date(year,month,i)).getDay()
            btnDate.setAttribute("value",`${year}/${month-1}/${i-1}/${day}_0/0`)
            btnDate.setAttribute("class","date")
            btnDate.innerHTML+=i
            dates.appendChild(clone)
        }
        for(let i=1; i<=(nowLastDay==6 ? 0 : 6-nowLastDay); i++){
            let clone = document.importNode(template.content,true)
            let btnDate = clone.querySelector('.date')
            btnDate.innerHTML+='<div>'+'</div>'
            day = (new Date(year,month,i)).getDay()
            btnDate.setAttribute("value",`${year}/${month+1}/${i-1}/${day}_0/0`)
            btnDate.setAttribute("class","date next")
            btnDate.innerHTML+=i
            dates.appendChild(clone)
        }
        } else {
        for(let i=1; i<=nowLastDate; i++){
            let clone = document.importNode(template.content,true)
            let btnDate = clone.querySelector('.date')
            btnDate.innerHTML+='<div class="date">'+i+'</div>'
            btnDate.value = `result[${month}][${i-1}]`
            dates.appendChild(clone)
        }
        for(let i=1; i<=(nowLastDay==6 ? 0 : 6-nowLastDay); i++){
            let clone = document.importNode(template.content,true)
            let btnDate = clone.querySelector('.date')
            btnDate.innerHTML+='<div class="date_next">'+i+'</div>'
            btnDate.value = `result[${month+1}][${i-1}]`
            dates.appendChild(clone)
        }
        }
    }

    btnLeft.addEventListener('click', btnLeftHandler)
    btnRight.addEventListener('click', btnRightHandler)

    function btnLeftHandler(){
        month-=1
        let now = new Date(year,month)
        createCalendar(now)
    }

    function btnRightHandler(){
        month+=1 // 달이 넘어가지 않는 이슈 해결
        let now = new Date(year,month)
        createCalendar(now)
    }

    function monthThreeWord(v){
        switch(v){
            case 1 :
                return 'JAN'
            break;
            case 2 :
                return 'FEB'
            break;
            case 3 :
                return 'MAR'
            break;
            case 4 :
                return 'APL'
            break;
            case 5 :
                return 'MAY'
            break;
            case 6 :
                return 'JUN'
            break;
            case 7 :
                return 'JUL'
            break;
            case 8 :
                return 'AGU'
            break;
            case 9 :
                return 'SEP'
            break;
            case 10 :
                return 'OCT'
            break;
            case 11 :
                return 'NOV'
            break;
            case 12 :
                return 'DEC'
            break;
            default:
                console.log('calendar month 오류 발생')
            break;
        }
    }
}