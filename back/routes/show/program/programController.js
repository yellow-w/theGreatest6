const { response } = require('express')
const pool = require('../../../db.js')

exports.main = (req,res, next) =>{
    next()
}

exports.showList = async (req,res)=>{
    console.log('연결 되니!')

    //2. 비동기로 요청을 줄 sql
    const sql = `SELECT show_idx, show_title, show_category_idx, show_xrated FROM shows ORDER BY show_idx DESC`

    try{
        //3. DB로 요청보내고 값을 받음
        const [result] = await pool.execute(sql)
        // console.log('result : ',result)
        
        //4. 리스트를 구하기위해 front로 값을 보냄
        let response = {
            // ...response,
            result,
            error:0,
        }
        res.json(response)
    }catch(e){
        console.log('에러')
    }
    
}

exports.showCard = (req,res)=>{
    console.log('showCard call!')
}

exports.showCalendar = (req,res)=>{
    console.log('showCalendark call!')
}

exports.showModify = (req,res)=>{
    console.log('글수정하냐')
}

exports.showWrite = async (req,res)=>{
    //요청body에 있는 입력받은 정보 가져옴
    const {category, xrated, title, ticketMonth, ticketDate, ticketHour, place, showMain, showSub, showDirector, showCompany} = req.body
    

    const sql = `INSERT INTO shows(show_title,show_category_idx,show_xrated,show_company,show_director,show_like,show_open_flag,show_content) VALUES (?,?,?,?,?,10,20,'40');`

    const prepare = [title,category,xrated,showCompany,showDirector]
    console.log(prepare)
    //sql구문을 실행시켜줄 execute
    //목적 : db에 보내기 위함 -> 결과물 = 비동기통신
    //확인하기위해 await 사용
    //결과물 = 배열 결과물에 대한 내용, 해당 레코드의 팰드내용(생략)
    //insert값은 result값이 객체로 돌아옴
    try{
        const [result] = await pool.execute(sql,prepare)
        console.log(result)
    }
    catch(e){
        console.log(e)
    }

    const response = {
        result:[],
        error:0,
    }
    
    res.json(response)
}

exports.showCalendar = (req,res)=>{
    console.log('showCalendark call!')
}