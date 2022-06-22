//reusable auto complete widget we need to have root element to append another elements
// render option and what to do after selecting an option we need input value to search based on it
// we need a request function which is fetch data
const makeAutoComplete=(
    {root,renderOption,onOptionSelect,inputValue ,fetchData})=>
{

    //we gonna make html elements inside our javascript code
   root.innerHTML=`
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
    <div class="dropdown-menu">
    <div class="dropdown-content results">
    </div>
    </div>
    </div>



`;
//we gonna select our elements
const input=root.querySelector('input');
const dropdown=root.querySelector('.dropdown');
const resultWrapper=root.querySelector('.results');


const onInput=async (event)=>
{
   
    resultWrapper.innerHTML='';
 const items=await fetchData(event.target.value);
 
        if(!items.length)
        {
            dropdown.classList.remove('is-active');
            return;
        }


dropdown.classList.add('is-active');


 for(let item of items)
 {
    
    const option=document.createElement('a');
    option.classList.add('dropdown-item');
   option.innerHTML=renderOption(item);
    option.addEventListener('click',()=>
    {
            dropdown.classList.remove('is-active');
          input.value=inputValue(item);
          onOptionSelect(item);
            
           
            
    });
    resultWrapper.appendChild(option);

   

 }


};

input.addEventListener('input',debounce(onInput,1000));
document.addEventListener('click',event=>
{
    if(!root.contains(event.target))
    {
        dropdown.classList.remove('is-active');
        
    }
});
}