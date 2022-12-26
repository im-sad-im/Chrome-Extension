
let myLeads = []  //- array list of items || similar datatypes
const inputEl = document.getElementById("input-el")
const buttonEl = document.getElementById("button-el")
const ulEl = document.getElementById("ul-el")
const deleteEl = document.getElementById("delete-btn")
const getFromStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabEl = document.getElementById("tab-btn")

if (getFromStorage) {
   myLeads = getFromStorage
   render(myLeads)
}

tabEl.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        // let activeTabId = activeTab.id // or do whatever you need
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) ) 
        render(myLeads)
    })  
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        //wrap the lead in an achor tag(<a>) inside the <li> /* template literals */
        listItems += `
        <li>
             <a href='${leads[i]}' target='_blank'>
             ${leads[i]}
             </a>
        </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteEl.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

buttonEl.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
   localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})