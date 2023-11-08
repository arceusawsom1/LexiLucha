import { useRef, useState } from "react";
import { IOption, IPhraseData } from "../types";

interface IProps{
    question: IPhraseData,
    selected: string[],
    onSelect: (index: number)=>void,
    onUnselect: (index: number)=>void,
    onSubmit: ()=>void,
}
const SearchBar = ({question,selected, onSelect, onUnselect, onSubmit}: IProps) => {
    const [currentSearch, setCurrentSearch] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
//This is where we handle the "smart autocomplete" feature
const handleKeypress = (e: { target: { value: string; }; }) => {
    // get the most up to date search
    let newSearch = e.target.value
    
    //We are going to find out if the last character was a space (which is the user's way of saying "ive finished typing my word")
    let spacePushed = false;
    if (newSearch.charAt(newSearch.length-1)===' '){
      newSearch = newSearch.substring(0,newSearch.length-1) //remove the space from the end of the search, since we don't actually want it
      spacePushed=true;
    }
    
    //A condition for comparing the search against he start of all the options
    const matches = (search : string, item : IOption) => item.value.substring(0, search.length).toLowerCase()===search.toLowerCase() && !item.selected
    
    //Get a list of all of the words that match
    const arrMatches = new Set(question!.options
      .map(option=> {if (matches(newSearch, option)) return option.value})
      .filter(item=>item!==undefined) //Filter out undefined
    )
    
    //If there is only one option left (duplicates are ok), or the spacebar was pushed
    if (arrMatches.size===1 || spacePushed){
      question!.options.some((option, optionIndex)=>{
        if (matches(newSearch, option) && (newSearch.length===option.value.length || !spacePushed)){
          onSelect(optionIndex);
          newSearch="" //This means that a search was found
          return true; //Make sure it only effects the first matching word
        }
      })
    }
    setCurrentSearch(newSearch)
  }
  const handleKeydown = (e:any )=>{
    if (e.code==="Enter"){
      onSubmit();
    }
    if (e.code==="Backspace" && e.target.value.length===0){
      onUnselect(selected.length-1)
    }
  }
    return (
        <input ref={inputRef} onBlur={()=>{if (inputRef.current!==null) inputRef.current.focus()}}  autoFocus value={currentSearch} onChange={handleKeypress} onKeyDown={handleKeydown}/>
    )
}

export default SearchBar