console.log('welcome to notes app.');
showNotes(); //relode hone ke sath ye sare nodes bapus se dikh jayge

//If user adds a note ,add it do the localstorage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
  let addTxt = document.getElementById('addTxt');
  let addTitle = document.getElementById('addTitle');
  let notes = localStorage.getItem('notes');
  if (notes == null) {
    notesObj = []; //Blank array
  } else {
    notesObj = JSON.parse(notes); //lekin agar mujhe kuch array milne wala th to mai us string ko parse krke wo array nikaluga.
  }
  let myObj={
    title:addTitle.value,
    text:addTxt.value
  }
  notesObj.push(myObj)
  //notesObj.push(addTxt.value); //notes update
  //Update Local storage
  localStorage.setItem('notes', JSON.stringify(notesObj));
  /*notesObj ko JSON.stringify kruga jo ki ek array a abhi ur bad m stringify hoke string m
convert ho jayega string m convert isliy kiya kuki LocalStorage ke ander string
m hi set krna pdta h*/
  addTxt.value = '';
  addTitle.value='';
  console.log(notesObj);

  showNotes();
});

/*Function to show elements from localStorage.
to showNotes() LocalStorage m se read krega
 sare ke sare elements ko uske bad show kr dega*/

function showNotes() {
  let notes = localStorage.getItem('notes');
  if (notes == null) {
    notesObj = []; //Blank array
  } else {
    notesObj = JSON.parse(notes); //lekin agar mujhe kuch array milne wala th to mai us string ko parse krke wo array nikaluga.
  }
  let html = ''; //blank string
  notesObj.forEach(function (element, index) {
    html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title"> ${element.title}</h5> 
      <p class="card-text">${element.text}</p>
<button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
    </div>
    </div>`;
  });
  let notesElm = document.getElementById('notes');
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

//function to delete a node
function deleteNote(index) {
  console.log('I am a deleting', index);
  /* ab mai deleteNote pr click kruga to deleteNote wala function call hoga
  ur usko iski id mil jayegi id hmne set kr rkhi h index.to inedx agar ek bar mil 
  jayegi to mai delete kr duga ur showNotes wale function ko run kr duga ur bapus se 
  update kr duga apne notes ko..
  this .id likne se  onclick ke ander usi element ki id chli jati h jis element
  pr click kiya gya ho.*/

  let notes = localStorage.getItem('notes');
  if (notes == null) {
    notesObj = []; //Blank array
  } else {
    notesObj = JSON.parse(notes); //notesObj ke ander sare ke sare notes aa chuke h
  }
  //ab mai yha pr delete kr duga ur bapus se local storage m set kr duga.
  notesObj.splice(index,1); 
/*splice phla argument lete h start yani ki starting index kaun sa h to wo h index
ur bha  se aap kitne element remove krna chate h*/

//LocalStorage Update 
localStorage.setItem('notes', JSON.stringify(notesObj));
showNotes();
}


let search=document.getElementById('searchTxt');
search.addEventListener('input',function(){
  let inputVal=search.value.toLowerCase();
  console.log('Input event fired!',inputVal)
 let noteCards=document.getElementsByClassName("noteCard")
 Array.from(noteCards).forEach(function(element){
   let cardTxt=element.getElementsByTagName("p")[0].innerText;
   if(cardTxt.includes(inputVal)){
     element.style.display="block";
   }
   else{
    element.style.display="none";
   }
   //console.log(cardTxt)
 })
})



/* further features 
1-Add Title
2.Mark a note as Important
3.Separate notes by user
4.Sync and host to webserver
*/