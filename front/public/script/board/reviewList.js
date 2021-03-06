let test = {};
// let rows = [];
document.addEventListener('DOMContentLoaded', init);

async function init() {
    axios.defaults.baseURL = 'http://localhost:4001/board/review';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const checks = document.querySelectorAll('#category ul li label input');
    const checked = document.querySelector('#category ul li label input:checked')
    
    const data1 = {
        category: checked.id
    }
    console.log('data',data1)
    let response = await axios.post('/list', data1)

    test = {
        ...response
    };

    const totalRecords = response.data.result.length
    const recordsPerPage = 10;
    const pagesPerBlock = 10;

    const totalPage = Math.ceil(totalRecords / recordsPerPage)
    const totalBlock = Math.ceil(totalPage / pagesPerBlock)

    let page = 1;
    const currentBlock = Math.ceil(page / pagesPerBlock);

    let startPageperBlock = [Math.ceil(page / pagesPerBlock) - 1] * pagesPerBlock
    let endPageperBlock = Math.ceil(page / pagesPerBlock) * pagesPerBlock

    if (endPageperBlock > totalPage) endPageperBlock = totalPage;
    const paging = document.querySelector('#paging');

    //페이징 시작....
    for (let i = startPageperBlock + 1; i <= endPageperBlock; i++) {
        const liElement = document.createElement('li'); 
        const aElement = document.createElement('a');
        aElement.setAttribute(`onClick`, `pages(${i})`);
        aElement.innerHTML = `[${i}]`
        liElement.appendChild(aElement);
        paging.appendChild(liElement);
    }


    // 레코드 자르기
    const Nodes = response.data.result.slice((page - 1) * recordsPerPage, page * recordsPerPage);
    const tr = document.querySelector('#communityBoardRow');
    const tbody = document.querySelector('table > tbody')

    await Nodes.forEach(v => {
        const showCategory = v.show_category_idx
        const clone = document.importNode(tr.content, true);
        const td = clone.querySelectorAll('td');
        const aElement = document.createElement('a');
        aElement.href = '/board/review/view/' + v.board_idx;
        aElement.innerHTML = v.board_subject;
        td[0].innerHTML = v.board_idx;
        switch (showCategory) {
            case 1:
                td[1].innerHTML = 'Classic';
                td[1].style.color = "#A5A5A5";
                break;
            case 2:
                td[1].innerHTML = 'Musical';
                td[1].style.color = "#DB6039";
                break;
            case 3:
                td[1].innerHTML = 'Opera';
                td[1].style.color = "#64CBE6";
                break;
            case 4:
                td[1].innerHTML = 'Ballet';
                td[1].style.color = "#FAE100";
                break;
        }
        td[2].appendChild(aElement);
        td[3].innerHTML = v.user_nickname
        td[4].innerHTML = v.board_date;
        td[5].innerHTML = v.board_hit;

        tbody.appendChild(clone);

    })
  

    for(let i=0; i < checks.length; i++){
        checks[i].addEventListener('click',checkedHandler)
    }
}


async function checkedHandler(e) {
    const data = {
        category: e.target.value
    }
    let response = await axios.post('/list', data)
        response = response.data
        test = {
            ...response
        };
    
        const totalRecords = response.result.length
        const recordsPerPage = 10;
        const pagesPerBlock = 10;


        const totalPage = Math.ceil(totalRecords / recordsPerPage)
        const totalBlock = Math.ceil(totalPage / pagesPerBlock)

        let page = 1;
        const currentBlock = Math.ceil(page / pagesPerBlock);

        let startPageperBlock = [Math.ceil(page / pagesPerBlock) - 1] * pagesPerBlock
        let endPageperBlock = Math.ceil(page / pagesPerBlock) * pagesPerBlock

        if (endPageperBlock > totalPage) endPageperBlock = totalPage;
        const paging = document.querySelector('#paging');


        for (let i = startPageperBlock + 1; i <= endPageperBlock; i++) {
            const liElement = document.createElement('li');
            const aElement = document.createElement('a');

            aElement.setAttribute(`onClick`, `pages(${i})`);
            aElement.innerHTML = `[${i}]`;
            liElement.appendChild(aElement);
            paging.appendChild(liElement);

        }

        const Nodes = response.result.slice((page - 1) * recordsPerPage, page * recordsPerPage);
        const tr = document.querySelector('#communityBoardRow');
        const tbody = document.querySelector('table > tbody');

        await Nodes.forEach(v => {
            const showCategory = v.show_category_idx
            const clone = document.importNode(tr.content, true);
            const td = clone.querySelectorAll('td');
            const aElement = document.createElement('a');
            aElement.href = '/board/review/view/' + v.board_idx;
            aElement.innerHTML = v.board_subject;
            td[0].innerHTML = v.board_idx;
            switch (showCategory) {
                case 1:
                    td[1].innerHTML = 'Classic';
                    td[1].style.color = "#A5A5A5";
                    break;
                case 2:
                    td[1].innerHTML = 'Musical';
                    td[1].style.color = "#DB6039";
                    break;
                case 3:
                    td[1].innerHTML = 'Opera';
                    td[1].style.color = "#64CBE6";
                    break;
                case 4:
                    td[1].innerHTML = 'Ballet';
                    td[1].style.color = "#FAE100";
                    break;
            }
            td[2].appendChild(aElement);
            td[3].innerHTML = v.user_nickname
            td[4].innerHTML = v.board_date;
            td[5].innerHTML = v.board_hit;

            tbody.appendChild(clone);

            let template = '';
            Nodes.forEach(v => { });
            tbody.innerHTML = template;

            paging.innerHTML = '';
            for (let i = startPageperBlock + 1; i <= endPageperBlock; i++) {
                const liElement = document.createElement('li');
                const aElement = document.createElement('a');

                aElement.setAttribute(`onClick`, `pages2(${i})`);
                aElement.innerHTML = `[${i}]`;
                liElement.appendChild(aElement);
                paging.appendChild(liElement);
            }
        })
    
    //라디오 선택시 랜더되는 첫 화면
    const Nodes1 = response.result.slice((page - 1) * recordsPerPage, page * recordsPerPage);
    const tr1 = document.querySelector('#communityBoardRow');
    const tbody1 = document.querySelector('table > tbody')

    await Nodes1.forEach(v => {
        const showCategory = v.show_category_idx
        const clone = document.importNode(tr1.content, true);
        const td = clone.querySelectorAll('td');
        const aElement = document.createElement('a');
        aElement.href = '/board/review/view/' + v.board_idx;
        aElement.innerHTML = v.board_subject;
        td[0].innerHTML = v.board_idx;
        switch (showCategory) {
            case 1:
                td[1].innerHTML = 'Classic';
                td[1].style.color = "#A5A5A5";
                break;
            case 2:
                td[1].innerHTML = 'Musical';
                td[1].style.color = "#DB6039";
                break;
            case 3:
                td[1].innerHTML = 'Opera';
                td[1].style.color = "#64CBE6";
                break;
            case 4:
                td[1].innerHTML = 'Ballet';
                td[1].style.color = "#FAE100";
                break;
        }
        td[2].appendChild(aElement);
        td[3].innerHTML = v.user_nickname
        td[4].innerHTML = v.board_date;
        td[5].innerHTML = v.board_hit;

        tbody1.appendChild(clone);

    })

}


async function pages(num) {
    
    const tr = document.querySelector('#communityBoardRow');
    const value = test.data.result
  
    const aElement = document.createElement('a');
    aElement.href = '/board/review//view' + value.board_idx;
    aElement.innerHTML = value.board_subject;

    const viewRows = 10;
    const Nodes = value.slice((num - 1) * viewRows, num * viewRows);
    const tbody = document.querySelector('table > tbody');

    let template = '';
    await Nodes.forEach(v => { });
    tbody.innerHTML = template;
 

    await Nodes.forEach(v => {
        const showCategory = v.show_category_idx
        const clone = document.importNode(tr.content, true);
        const td = clone.querySelectorAll('td');
        const aElement = document.createElement('a');
        aElement.href = '/board/review/view/' + v.board_idx;
        aElement.innerHTML = v.board_subject;
        td[0].innerHTML = v.board_idx;
        switch (showCategory) {
            case 1:
                td[1].innerHTML = 'Classic';
                td[1].style.color = "#A5A5A5";
                break;
            case 2:
                td[1].innerHTML = 'Musical';
                td[1].style.color = "#DB6039";
                break;
            case 3:
                td[1].innerHTML = 'Opera';
                td[1].style.color = "#64CBE6";
                break;
            case 4:
                td[1].innerHTML = 'Ballet';
                td[1].style.color = "#FAE100";
                break;
        }
        td[2].appendChild(aElement);
        td[3].innerHTML = v.user_nickname
        td[4].innerHTML = v.board_date;
        td[5].innerHTML = v.board_hit;

        const tbody = document.querySelector('table > tbody');
        tbody.appendChild(clone);

    })
}


async function pages2(num) {
    
    const tr = document.querySelector('#communityBoardRow');
    const value = test.result
  
    const aElement = document.createElement('a');
    aElement.href = '/board/review//view' + value.board_idx;
    aElement.innerHTML = value.board_subject;

    const viewRows = 10;
    const Nodes = value.slice((num - 1) * viewRows, num * viewRows);
    const tbody = document.querySelector('table > tbody');

    let template = '';
    await Nodes.forEach(v => { });
    tbody.innerHTML = template;
 

    await Nodes.forEach(v => {
        const showCategory = v.show_category_idx
        const clone = document.importNode(tr.content, true);
        const td = clone.querySelectorAll('td');
        const aElement = document.createElement('a');
        aElement.href = '/board/review/view/' + v.board_idx;
        aElement.innerHTML = v.board_subject;
        td[0].innerHTML = v.board_idx;
        switch (showCategory) {
            case 1:
                td[1].innerHTML = 'Classic';
                td[1].style.color = "#A5A5A5";
                break;
            case 2:
                td[1].innerHTML = 'Musical';
                td[1].style.color = "#DB6039";
                break;
            case 3:
                td[1].innerHTML = 'Opera';
                td[1].style.color = "#64CBE6";
                break;
            case 4:
                td[1].innerHTML = 'Ballet';
                td[1].style.color = "#FAE100";
                break;
        }
        td[2].appendChild(aElement);
        td[3].innerHTML = v.user_nickname
        td[4].innerHTML = v.board_date;
        td[5].innerHTML = v.board_hit;

        const tbody = document.querySelector('table > tbody');
        tbody.appendChild(clone);

    })
}