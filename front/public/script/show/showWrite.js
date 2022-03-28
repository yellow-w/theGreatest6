document.addEventListener('DOMContentLoaded', init)


async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/show/promgram/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const writeForm = document.querySelector('#writeForm');
    writeForm.addEventListener('submit',makeData)
        
    async function makeData(e){
        e.preventDefault();
        const data = {
            idx: document.querySelector('#idx').value,
            subject: document.querySelector('#subject').value,
            userid: document.querySelector('#userid').value,
            title: document.querySelector('#title').value,
            content: document.querySelector('#content').value
        }

        console.log(data);
        const response = await axios.post('showwrite',data);

        if(response!==undefined){
<<<<<<< HEAD
            // const { idx } = response.data.result
=======
            // const { idx } = response.data.result;
>>>>>>> f08007a2e80104a1b4c0ae066dc6c82dbf12f15e
            location.href=`http://localhost:3001/show/program/showview/${idx.value}`,{
                withCredentials:true,
            }
        }else{
            alert('에러!');
        }
    }
}
