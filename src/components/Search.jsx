import React, { useState, useRef, useEffect } from 'react'
import { FindIcon, CloseIcon, SpinnerIcon } from '../components/icons/icons'
import Poper from '../components/Poper'
import Tippy from '@tippyjs/react/headless';
import User from './User';
import { useDebounce } from '../hooks/hooks'
import * as searchApi from '../api/searchApi'
import { useSelector, useDispatch } from 'react-redux';
import { dontShowInput, setInputValue, showInput } from '../redux/appSlice';
function Search() {
    const showInputmodal = useSelector((data) => data.appState.isShowInput)
    const valueInput = useSelector((data) => data.appState.inputValue)
    const dispatch = useDispatch()
    const [listUser, setListUser] = useState([])
    const [loading, setLoading] = useState(false);
    const debounced = useDebounce(valueInput, 500)
    const inputRef = useRef()
    useEffect(() => {
        if (!debounced.trim()) {
            setListUser([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);
            const result = await searchApi.search(debounced);
            setListUser(result)
            setLoading(false)
        }
        fetchApi();
    }, [debounced])
    const handleClear = () => {
        dispatch(setInputValue(""))
        setListUser([])
        inputRef.current.focus()
    }
    // useEffect(() => {
    //     setShow(show)
    // }, [show])
    return (
        <div className="h-input w-input bg-input rounded-full overflow-hidden border-focus focus-within:border-search">
            <Tippy
                visible={listUser.length > 0 && debounced && showInputmodal}
                delay={[0, 700]}
                placement="bottom-end"
                interactive
                appendTo={document.body}
                onClickOutside={() => {
                    dispatch(dontShowInput())
                }}
                render={attrs => (
                    <div className="w-input" tabIndex="-1" {...attrs}>
                        <Poper>
                            <p className='h-7 py-1 px-3 font-semibold text-[#16182380]'>Tài khoản</p>
                            {listUser.map((e, i) => <User item={e} key={i} />)}
                        </Poper>
                    </div>
                )}
            >
                <form action="#" className='px-4 py-3 flex relative'>
                    <input
                        type="text"
                        className='outline-none w-72 bg-transparent caret-input '
                        placeholder='Tìm kiếm tài khoản và video'
                        onChange={e => {
                            dispatch(setInputValue(e.target.value))
                        }}
                        ref={inputRef}
                        value={valueInput}
                        onFocus={() => dispatch(showInput())
                        }
                    />
                    {debounced && !loading && <button className='absolute right-16 top-[14px] ' onClick={handleClear}><CloseIcon className="" /></button>}
                    {loading && <SpinnerIcon className='absolute right-16 top-[14px] animate-spin' />}
                    <span className='w-span h-7 m-span bg-span inline-block'></span>
                    <button className='p-search m-search ml-auto hover:bg-input'>
                        <FindIcon className='text-search' />
                    </button>
                </form>
            </Tippy>
        </div>
    )
}

export default Search