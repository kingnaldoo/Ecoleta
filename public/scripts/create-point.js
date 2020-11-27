const cep = document.querySelector('input[name=cep]')
const items = document.querySelector('#items ul')
let selectedItems = []


cep.addEventListener('keyup', () => {
    console.log(cep.value)
    if (String(cep.value).length == 8){
        let valor = String(cep.value)
        fetch(`https://viacep.com.br/ws/${valor}/json/`)
        .then((res)=>{
            if(res.ok == true){
                return res.json().then((dado1)=>{
                    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${dado1.uf}`)
                    .then((resp)=>{
                            return resp.json()
                        })
                    .then((dado2)=>{
                        document.querySelector('#state').innerHTML = `<option value="${dado2.nome}">${dado2.nome}</option>`
        
                        document.querySelector('#city').innerHTML = `<option value="${dado1.localidade}">${dado1.localidade}</option>`
                    })
                })
            }
            else if(res.ok == ''){
                document.querySelector('#state').innerHTML = `<option value="">Estado não encontrado</option>`
        
                document.querySelector('#city').innerHTML = `<option value="">Cidade não encontrada</option>`
            }
            
        })
        
    }
})

items.addEventListener('click', (event)=> {
    event.target.toggleAttribute('selected')
    let item = event.target.innerText

    if(selectedItems.indexOf(item) == -1){

        selectedItems.push(item)
    }
    else{
        selectedItems.splice(selectedItems.indexOf(item), 1)
    }

    document.querySelector('#items ul').setAttribute('value', `${selectedItems.join(', ')}`)

})