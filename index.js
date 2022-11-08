
const autoCompleteConfig={
    renderOption(movie){
        const imgSrc=movie.Poster==='N/A'? "": movie.Poster;
    
        return `
        <img src="${imgSrc}"/>
        ${movie.Title} ${movie.Year}
        
        `;
        
     
    
   
        
     
        
       
       
       
       
    },
   
    inputValue(movie)
    {
        return movie.Title;
    },

    async fetchData(searchTerm) 
{
    //your API key and search by index or search by term
    const response=await axios.get('https://www.omdbapi.com/',{
        params:
        {
            apikey:'e1542f15',
            s:searchTerm
        }
        
    });
   
    
    if(response.data.Error)
    {
            return [];
    }else
    {
        
       console.log(response.data);
       return response.data.Search;
    }

    
}

};

makeAutoComplete({
...autoCompleteConfig, onOptionSelect(movie)
{
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie,document.querySelector('#left-summary'),'left');
},
root:document.querySelector('#left-autocomplete'),

});

makeAutoComplete({
    ...autoCompleteConfig, onOptionSelect(movie)
    {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie,document.querySelector('#right-summary'),'right');
    },
    root:document.querySelector('#right-autocomplete'),
    
    });
    let leftMovie;
    let rightMovie;


    //this function is to select a movie
const onMovieSelect=async (movie,summaryElement,side)=>
{
    const response=await axios.get('http://www.omdbapi.com/',{
        params:
        {
            apikey:'e1542f15',
            i:movie.imdbID
        }
        
    });
  
    //viewing response from server into html template
   summaryElement.innerHTML=movieTemplate(response.data);
   if(side==='left')
   {
       leftMovie=response.data;
   }else
   {
       rightMovie=response.data;
   }
   if(leftMovie && rightMovie)
   {
    runComparision();
   }
};

//comparision based on numbers
const runComparision=()=>
{
    const leftSideStats=document.querySelectorAll('#left-summary .notification');
    const rightSideStats=document.querySelectorAll('#right-summary .notification');
    leftSideStats.forEach((leftStat,index)=>{

        const rightStat=rightSideStats[index];
      
        const leftSideValue=leftStat.dataset.value;
        const rightSideValue=rightStat.dataset.value;
        if(rightSideValue>leftSideValue)
        {
              leftStat.classList.remove('is-primary');
              leftStat.classList.add('is-warning');
        }else
        {
            rightStat.classList.remove('is-primary');
            rightStat.classList.add('is-warning');
        }

    });

}

//creating a template to rendering the response 
const movieTemplate=movieDetail=>
{

        const dollars=parseInt(movieDetail.BoxOffice.replace(/\$/g,'').replace(/,/g,''));
        const metaScore=parseInt(movieDetail.Metascore);
        const imdbRating=parseFloat(movieDetail.imdbRating);
        const imdbVotes=parseInt(movieDetail.imdbVotes.replace(/,/g,''));
        
        const awards=movieDetail.Awards.split(' ').reduce((prev,words)=>{

                const value=parseInt(words);
                if(isNaN(value))
                {
                    return prev;
                }else 
                {
                     return prev+value;
                }








        },0); 
        console.log(awards)
    return `
           <article class="media">
           <figure class="media-left">
           <p class="image">
           <img src="${movieDetail.Poster}"/>
           </p>
           </figure>
           <div class="media-content">
           <div class="content">
           <h1>${movieDetail.Title} ${movieDetail.Year}</h1>
           <h4>${movieDetail.Genre}</h4>
           <p>${movieDetail.Plot}</p>
           </div> 
           </div>
           </article>
           <article data-value=${awards} class="notification is-primary">
           <p class="title">${movieDetail.Awards}</p>
           <p class="subtitle">Awards</p>
           </article>

           <article data-value=${dollars} class="notification is-primary">
           <p class="title">${movieDetail.BoxOffice}</p>
           <p class="subtitle">Box Office</p>
           </article>
           <article data-value=${metaScore} class="notification is-primary">
           <p class="title">${movieDetail.Metascore}</p>
           <p class="subtitle">Meta Score</p>
           </article>
           <article data-value=${imdbRating} class="notification is-primary">
           <p class="title">${movieDetail.imdbRating}</p>
           <p class="subtitle">IMDB Rating</p>
           </article>

           <article data-value=${imdbVotes} class="notification is-primary">
           <p class="title">${movieDetail.imdbVotes}</p>
           <p class="subtitle">IMDB Votes</p>
           </article>

         
    
    `;




};

