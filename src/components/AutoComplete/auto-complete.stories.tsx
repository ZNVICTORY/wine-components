import React, {useState} from "react";
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import AutoComplete, { DataSourceType } from './auto-complete';

interface lakerProps {
    number: number,
    value: string
}
interface githubProps {
    login: string;
    url: string;
    avatar_url: string;
}
const AutoCompleteDemo = () => {
    const data = ['jaaa', 'aaa', 'hshshsh', 'kkkkk'] 

    // const handleFetch = (query: string) => {
    //     return data.filter(item => item.includes(query) )
    // }
   
    const lakers = [
        {  number: 12, value: 'iii'},
        {  number: 12, value: 'jjj'},
        {  number: 11, value: 'aaa'},
        {  number: 1, value: 'bbb'}
    ]
    const handleFetch = (query: string) => {
            // return lakers.filter(item => item.value.includes(query))
            return fetch(`https://api.github.com/search/users?q=${query}`)
                .then(res => res.json())
                .then(({ items }) => {
                    // console.log(items)
                    return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
                })
    }
    const renderOption = (item: DataSourceType) => {
        const i = item as DataSourceType<githubProps>
        return (
            <>
               <div>{i.value}</div>
               <div>{i.avatar_url}</div>
            </>
        )
    }
     return (
         <AutoComplete 
            fetchSuggestions={handleFetch} 
            renderOption={renderOption} 
            onSelect={action('selected')}  
            />
     )
}
storiesOf('AutoComplete Component', module)
.add('AutoComplete', AutoCompleteDemo)