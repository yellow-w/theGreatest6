const express = require('express')
const pool = require('../../../db.js')

let response = {
    result:[],
    errno:1
}

exports.main = (req,res, next) =>{
    next()
}

exports.showWrite = async (req,res)=>{
    console.log('back / showWrite 라우터 접속!')
    const today = new Date()
    const thisYear = today.getFullYear()

    const {category, xrated, title, place, showCast1, showCast2, showDirector,showCompany,showContent,ticketMonth,ticketDate,ticketHour,showMonth,showDate,showHour} = req.body

    try{
        const sqlShow = `INSERT INTO shows(
            show_title,
            show_category_idx,
            show_xrated,
            show_company,
            show_director,
            show_like,
            show_content,
            show_open_flag
        )VALUES(?,?,?,?,?,'0',?,'0')`
        const prespareShow = [title,category, xrated,showCompany,showDirector,showContent]
        const [resultShow] = await pool.execute(sqlShow,prespareShow)
    
        const timestamp = `${thisYear}-${ticketMonth}-${ticketDate} ${ticketHour}:00`
        const newIdx = resultShow.insertId

        const prespareOption = [newIdx, timestamp, place, showCast1, showCast2]
        const sqlOption = `INSERT
        INTO s_option(shows_idx, show_date, show_place, show_cast1, show_cast2)
        VALUES (?,?,?,?,?)`
        const [resultOption] = await pool.execute(sqlOption,prespareOption)
 
        response = {
            resultShow,
            resultOption,
            error:0,
        }
        res.json(response)
    }
    catch(e){
        console.log(e)
    }
}

exports.showList = async (req,res)=>{
    console.log('back / showList 라우터 접속!')

    const sql = `SELECT show_idx, show_title, show_category_idx, show_xrated FROM shows ORDER BY show_idx DESC`

    try{
        const [result] = await pool.execute(sql)
        response = {
            // ...response,
            result,
            error:0,
        }
        res.json(response)
    }
    catch(e){
        console.log("showList 에러발생")
    }
    
}

exports.showCard = (req,res)=>{
    console.log('back / showCard 라우터 접속!')
}

exports.showCalendar = (req,res)=>{
    console.log('back / showCalendar 라우터 접속!')
}

exports.showView = async (req,res)=>{
    console.log('back / showView 라우터 접속!')

    const {idx} = req.params
    const sql = `select * from shows where show_idx=${idx};`

    try{
        const [result] = await pool.execute(sql)
        response = {
            result,
            error:0,
        }
        res.json(response)
    }
    catch(e){
        console.log("showView 에러발생")
    }
}

exports.showModify = (req,res)=>{
    console.log('back / showModify 라우터 접속!')
}

exports.showDelete = async (req,res)=>{
    console.log('back / showDelete 라우터 접속!')
    let {idx} = req.params
    
    try{
        const sql = `DELETE FROM shows WHERE show_idx='${idx}'`
        const [result] = await pool.execute(sql)
    }
    catch(e){
        console.log("showModify 에러발생")
    }
}

exports.showCalendar = (req,res)=>{
    console.log('back / showCalendar 라우터 접속!')
}