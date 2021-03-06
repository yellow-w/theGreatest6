const pool = require('../../../db');
const sql = require('../../../SQL/queries.js')

let response = {
    result: [],
    errno: 1
    };

const date = `DATE_FORMAT(news_date, '%Y-%m-%d') AS news_date`
const datetime = `DATE_FORMAT(board_date, '%Y-%m-%d %h:%i:%s') AS board_date`

exports.newsList = async (req, res) => {
    const sql = `SELECT *,${date} 
                FROM b_news AS n 
                LEFT OUTER JOIN user AS u
                ON n.user_idx = u.user_idx
                ORDER BY n.board_news_idx DESC`;
    try {
        const [result] = await pool.execute(sql);
        response = {
            ...response,
            result,
            errno: 0
        } 
    } catch (e) {
        console.log('/newslist',e.message);
    }
    res.json(response);
}



exports.newsWrite = async (req,res) =>{     
    const {subject, content}=req.body;
    const {user_idx}=req.body.user                
    const sql = 'INSERT INTO b_news(user_idx,news_subject,news_content) VALUES(?,?,?)';
    const prepare = [user_idx,subject,content];

    try{
        const [result] = await pool.execute(sql,prepare);
        response = {
            result:{
                row:result.affectedRows,
                insertId:result.insertId
            },
            errno:0    
        };
        res.json(response)
    }catch(e){
        console.log('/newswright',e.message);
    };
}

exports.newsView = async (req,res) => {
    const{idx}=req.params;
    const prepare = [idx];

    const hitSql = `UPDATE b_news SET news_hit = news_hit + 1 WHERE board_news_idx = ${idx}`
    const hitResult = await pool.execute(hitSql);
 
    const sql = `SELECT *,${date} FROM b_news WHERE board_news_idx = ${idx} `;
       
    try{
        const [result] = await pool.execute(sql);
        response = {
            result,
            errno:0
        };
        res.json(response);
        // console.log(response)
    } catch(e) {
        console.log('/newsview',e.message);
    };

}

exports.newsDelete = async (req,res) =>{
    const{idx}=req.params;
    const sql = `DELETE FROM b_news WHERE board_news_idx = ? `;
    const prepare = [idx];
    try{
        const [result] = await pool.execute(sql,prepare);
        response = {
                result,
                errno:0
            };
        res.json(response);
       
    } catch (e) {
        console.log('newsdelete',e.message);
        
    };
   
}