
const  pool  = require("../../../db")

let response = {
    result:[],
    errno:1
}

exports.communityList = async (req,res) =>{
    const sql = `SELECT board_idx, board_subject, user_idx, board_date, board_hit FROM board ORDER BY board_idx DESC`
    const classicSql = `SELECT board_idx, board_subject, user_idx, board_date, board_hit FROM board WHERE show_category_idx = 1 ORDER BY board_idx DESC`
    const musicalSql = `SELECT board_idx, board_subject, user_idx, board_date, board_hit FROM board WHERE show_category_idx = 2 ORDER BY board_idx DESC`
    const operaSql = `SELECT board_idx, board_subject, user_idx, board_date, board_hit FROM board WHERE show_category_idx = 3 ORDER BY board_idx DESC`
    const balletSql = `SELECT board_idx, board_subject, user_idx, board_date, board_hit FROM board WHERE show_category_idx = 4 ORDER BY board_idx DESC`

    const {category} = req.body
    console.log(category)

    try{
        if(category === 'classic'){
            const [result] = await pool.execute(classicSql)
            response = {
                ...response,
                result,
                errno:0
            }
            
        } else if (category === 'musical'){
            const [result] = await pool.execute(musicalSql)
            response = {
                ...response,
                result,
                errno:0
            }
        } else if (category === 'opera'){
            const [result] = await pool.execute(operaSql)
            response = {
                ...response,
                result,
                errno:0
            }
        } else if (category === 'ballet'){
            const [result] = await pool.execute(balletSql)
            response = {
                ...response,
                result,
                errno:0
            }
        }

        // const [result] = await pool.execute(sql)
        // response = {
        //     ...response,
        //     result,
        //     errno:0
        // }
        
        res.json(response)
    } catch (e){
        console.log('에러메세지',e)

    }

}

exports.communityWrite = async (req,res) =>{                                
    const {select}=req.body
    const sql = "SELECT * FROM s_category WHERE show_category = ?"
    const prepare = [select]

    const result = await pool.execute(sql,prepare)
    
    const [idx] = result[0]
    const {subject,content}=req.body
    const categoryIdx = idx.show_category_id
    const sql2 = 'INSERT INTO board(user_idx,board_subject,board_content,show_category_idx) VALUES(?,?,?,?)'
    
    const prepare2 = ['117',subject,content,categoryIdx]

    try{
        const [result] = await pool.execute(sql2,prepare2)
        response = {
            result:{
                row:result.affectedRows,
                insertId:result.insertId
            },
            errno:0    
        }
        res.json(response)

        const fileOriginalname = req.file.originalname
        const fileStoredname = req.file.filename
        const fileSize = req.file.size
        const fileDate = new Date()
        const fileDltF = '0'
        const fSql = `INSERT INTO b_file (
                                            board_idx,
                                            file_originalname,
                                            file_storedname,
                                            file_size,
                                            file_date,
                                            file_dlt_flag
                                            )
                                    VALUES(?,?,?,?,?,?)`

        const boardIdx = result.insertId
        const fPrepare = [boardIdx,fileOriginalname,fileStoredname,fileSize,fileDate,fileDltF]                           

        if(req.file.size > 0){

            const [result] = await pool.execute(fSql,fPrepare)
            response = {
                result:{
                    row:result.affectedRows,
                    insertId:result.insertId
                },
                errno:0    
            } 
            
        } 

    }catch(e){
        console.log(e.message)
    }
}

exports.communityView = async (req,res) => {
    const{idx}=req.params
    const prepare = [idx]


    const sql = `SELECT * FROM board WHERE board_idx = ? `
   
    try{
        const [result] = await pool.execute(sql,prepare)
        response = {
            result,
            errno:0
        }
        res.json(response)
    } catch (e) {
        console.log(e.message)
    }

}

exports.communityDelete = async (req,res) =>{
    const{idx}=req.params
    const sql = `DELETE FROM board WHERE board_idx = ? `
    const prepare = [idx]
    try{
        const [result] = await pool.execute(sql,prepare)
        response = {
                result,
                errno:0
            }
        res.json(response)
       
    } catch (e) {
        console.log(e.message)
        
    }
   
}

exports.communityUpdate = async (req,res)=>{
    const{idx}=req.params
    const boardIdxPre = idx

    const {select}=req.body
    const sql = "SELECT * FROM s_category WHERE show_category = ?"
    const selectPre = [select]

    const result = await pool.execute(sql,selectPre)

    const [selectidx] = result[0]
    const {subject,content}=req.body
    const categoryIdx = selectidx.show_category_id
    const sql2 = `UPDATE board SET board_subject=?, board_content=?, show_category_idx=? WHERE board_idx=?`

    const prepare2 = [subject,content,categoryIdx,boardIdxPre]

    try{
        const [result] = await pool.execute(sql2,prepare2)
        const response = {
            result:{
                row:result.affectedRows,
                insertId:result.insertId
            },
            errno:0    
        }
        res.json(response)

        const fileOriginalname = req.file.originalname
        const fileStoredname = req.file.filename
        const fileSize = req.file.size
        const fileDate = new Date()
        const fSql = `UPDATE b_file SET 
                                    file_originalname = ?,
                                    file_storedname = ?,
                                    file_size = ?,
                                    file_date = ?,
                                    WHERE
                                    board_idx = ?
                                    `

        const fPrepare = [fileOriginalname,fileStoredname,fileSize,fileDate,idxPrepare]                           

        if(req.file.size > 0){

            const [result] = await pool.execute(fSql,fPrepare)
            response = {
                result:{
                    row:result.affectedRows,
                    insertId:result.insertId
                },
                errno:0    
            } 
            
        } 

    }catch(e){
        console.log(e.message)
    }
}