
document.querySelector('.create-item').addEventListener('click' , function(){
    // document.querySelector('.new input').value = ""
    document.querySelector('.new').style.display='block'
})

fetchitems()
document.querySelector('.new button').addEventListener('click' , function(){
   let data =  document.querySelector('.new input').value ;
   let item = localStorage.getItem('todo-items')
   let itemsarray = JSON.parse(item)
   if(itemsarray == null){
    itemsarray =[]
   }
console.log("data   " , itemsarray)
   if(data !=''){
    itemsarray.push({"item" : data , "status" : 0})

       
   saveitems(itemsarray);
   fetchitems();
 
    document.querySelector('.new').style.display='none'

   }


})

function saveitems (itemsarray){
        let data = JSON.stringify(itemsarray)

    localStorage.setItem('todo-items' , data )
}


function fetchitems() {

    const itemList = document.querySelector('ul.todo-items');
    itemList.innerHTML = '';
    var  newItemHTML ='' 
    try {
        let item = localStorage.getItem('todo-items')
        let itemsarray = JSON.parse(item)

        for ( let i = 0 ; i < itemsarray.length ; i++){

            var status = ''
            if(itemsarray[i].status == 1){
                console.log("ssss")
                status = 'class="done"';
            }
            newItemHTML +=  ` <li data-itemindex="${i}" ${status}>
            <span class="item">${itemsarray[i].item}</span><div>
             <span class="itemcomplete">✅</span><span class="itemdelete">❌</span></div></li>`;

        }
        
        itemList.innerHTML = newItemHTML


let itemListul = document.querySelectorAll('ul li')

for ( let i = 0 ; i <itemListul.length ; i++ ){
    console.log("indes")
    itemListul[i].querySelector('.itemcomplete').addEventListener('click' , function(){
        var index  = this.parentNode.parentNode.dataset.itemindex;
console.log("indes",  index)
        itemcomplete(index)
    })
    
    itemListul[i].querySelector('.itemdelete').addEventListener('click' , function(){
        var inde  = this.parentNode.parentNode.dataset.itemindex;

        itemdelete(inde)
    })
}

    } catch (error) {
      console.log(error)  
    }
    
}


function itemdelete(index) {
    let item = localStorage.getItem('todo-items')
    let itemsarray = JSON.parse(item)
    itemsarray.splice(index , 1 )
    saveitems(itemsarray);
    console.log(itemsarray, "de")
    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').remove()
}

function itemcomplete(index) {
    let item = localStorage.getItem('todo-items')
    let itemsarray = JSON.parse(item)
    console.log("comsa" , index ,itemsarray)
    itemsarray[index].status = 1 ; 
    saveitems(itemsarray)
    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').classList.add('done');

}