
async function makeRequest(url, method, body){
    let headers = {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
        }
    
    if (method == 'post'){
        const csrf = document.querySelector('[name=csrfmiddlewaretoken').value
        headers['X-CSRFToken'] = csrf
    }
    let response = await fetch(url, {
        method: method,
        headers: headers,
        body: body
        
    })
    //data = await response.json()
    return await response.json()    
}
async function getNumber() {

    const data = await makeRequest('/test/', 'get')
    let ul_left = document.getElementById('left')
    let li = document.createElement('li')
    li.addEventListener('click', getFloatNumber)
    li.innerHTML = await data['number']
    ul_left.appendChild(li)
}


async function getFloatNumber(e){
    let number = e.target.innerText
    let data = await makeRequest('/test2/', 'post', JSON.stringify({number: number}))
    let ul_right = document.getElementById('right')
    let li = document.createElement('li')
    li.innerText = await data['float']
    ul_right.appendChild(li)
}
