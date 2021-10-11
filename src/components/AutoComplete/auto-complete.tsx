import React, { ChangeEvent, FC, ReactElement, useState, useEffect, KeyboardEvent, useRef } from "react";
import Icon from "../Icon/icon";
import Input, { InputProps } from "../Input/input";
import useDebounce from  '../../hook/useDebounce';
import useClickOutSide from "../../hook/useClickoutSide";
import classNames from 'classnames';
import Transition from '../Transition/transition';


interface DataSourceObject {
    value: string
}
export type DataSourceType <T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (value: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (value: DataSourceType) => void;
    renderOption?: (value: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const { onSelect, fetchSuggestions , value, renderOption, ...restProps} = props;
    const [ InputValue, setInputValue] = useState(value);
    const [ showDropdown, setShowDropdown] = useState(false)
    const [ highlightIndex, setHighlightIndex] = useState(-1)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null); 
    const [ suggestions, setSuggestions] = useState<DataSourceType[]>([]);
    const [ loading, setLoading ] = useState(false);
    const debounceValue = useDebounce(InputValue, 300);
    useClickOutSide(componentRef, () => {
        setSuggestions([]);
    })

    useEffect(() => {
        if(debounceValue && triggerSearch.current) {
            const result = fetchSuggestions(debounceValue);
            if(result instanceof Promise) {
                setLoading(true)
                result.then((data) => {
                    setLoading(false)
                    setShowDropdown(true)
                    setSuggestions(data);
                })
            } else {
                setShowDropdown(true)
                setSuggestions(result);
            }
        } else {
            setShowDropdown(false)
        }

    }, [debounceValue, fetchSuggestions])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true
    }

    const renderTemplete = (value: DataSourceType) => {
        return renderOption ? renderOption(value) : value.value
    }
    const handleSelect = (val: DataSourceType) => {
        setInputValue(val.value);
        setSuggestions([]);
        triggerSearch.current = false;
        setShowDropdown(false)
        if(onSelect) {
            onSelect(val)
        }
    }
    const generateDropDown = () => {
        return (
            <Transition
            in={showDropdown || loading}
            animation="zoom-in-top"
            timeout={300}
            onExited={() => {setSuggestions([])}}
          >
            <ul className="viking-suggestion-list">
              { loading &&
                <div className="suggstions-loading-icon">
                  <Icon icon="spinner" spin/>
                </div>
              }
              {suggestions.map((item, index) => {
                const cnames = classNames('suggestion-item', {
                  'is-active': index === highlightIndex
                })
                return (
                  <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                        {renderTemplete(item)}
                  </li>
                )
              })}
            </ul>
          </Transition>
        )
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        // console.log(e, 'joijiji')
        switch(e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                  handleSelect(suggestions[highlightIndex])
                }
                break
              case 38:
                highlight(highlightIndex - 1)
                break
              case 40:
                highlight(highlightIndex + 1)
                break
              case 27:
                setShowDropdown(false)
                break
              default:
                break
        }
    }
    const highlight = (index: number) => {
        if (index < 0) index = 0
        if (index >= suggestions.length) {
          index = suggestions.length - 1
        }
        setHighlightIndex(index)
      }


    return (
        <div className="viking-auto-complete" ref={componentRef}>
            <Input 
                value={InputValue} 
                onChange={handleChange} 
                onKeyDown={handleKeyDown}
                {...restProps} />
            { loading && <ul><Icon icon="spinner" spin/></ul>}
            {suggestions.length > 0 &&  generateDropDown()}
        </div>
    )
}

export default AutoComplete;