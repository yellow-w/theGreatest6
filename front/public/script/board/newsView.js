

document.addEventListener('DOMContentLoaded', init);
async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/news';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    const response1 = await axios.post('http://localhost:3001/account/management/getuserinfo', null);
    const { user } = response1.data.result;
    const user_nickname = user.user_nickname;
    const admin = user.user_id


    const [, , , , idx] = location.pathname.split('/');
    console.log(idx)
    const boardIdx = document.querySelector('#idx');
    const subject = document.querySelector('#subject');
    const nickname = document.querySelector('#writer');
    const date = document.querySelector('#date');
    const content = document.querySelector('#bContent');
    const hit = document.querySelector('#hit');

    if( admin !== 'admin@gmail.com'){
        const deleteBtn = document.querySelector('#deleteFrm')
        deleteBtn.innerHTML = ""
    }else{
        const upElement = document.querySelector('#update');
        const aElement = document.createElement('a');
        aElement.href = `/board/news/update/` + `${idx}`;
        aElement.innerHTML = 'Edit';
        upElement.appendChild(aElement);
    }
    
    const response = await axios.post(`/view/${idx}`, {
        withCredentials: true,
    });

    if (response.data.errno === 0) {
        const [{ news_subject, news_date, news_hit, news_content}] = response.data.result;

        boardIdx.innerHTML = idx;
        subject.innerHTML = news_subject;
        nickname.innerHTML = user_nickname
        date.innerHTML = news_date;
        hit.innerHTML = news_hit;
        content.innerHTML = news_content;

    } else {

    };

    const deleteFrm = document.querySelector('#deleteFrm');
    deleteFrm.addEventListener('submit',
        async function deleteSubmit(e) {
            e.preventDefault();

            try {
                await axios.post(`/delete/${idx}`);
                location.href = '/board/news/list';
            } catch (e) {
                console.log('newsviewdlt', e.message)
                alert('try again');
            };

    });


} 

