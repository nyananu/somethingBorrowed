import '../styles/search.css'
import React, { useState } from 'react'
import { ITEM_TYPES, RATINGS, colourOptions} from '../constants'
import { getAllItemsAsync, getItemByTypeAsync, applySearchTextAsync } from '../redux/items/thunks'
import { useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

function Search () {
  const [itemType, setItemType] = useState('')
  
  const itemTypeDropdowns = Object.values(ITEM_TYPES).map((type) => {
    return <option key={type}>{type}</option>
  })

  const ratesDropdowns = Object.values(RATINGS).map((rateValue) => {
    return <li key={rateValue}><input type="checkbox" />{rateValue} </li>
	//<><label htmlFor={rateValue} className='label' key={rateValue}>{rateValue}		</label><input type="checkbox" id={rateValue} className='checkbox' key={rateValue+'checkbox'}/></>
  })

  const dispatch = useDispatch()

  function handleCategory (event) {
    if (event.target.value === 'Select item type...') {
      alert('Please select a type from the filter list')
      setItemType('')
      dispatch(getAllItemsAsync())
      return
    }
    setItemType(event.target.value)
    dispatch(getItemByTypeAsync(event.target.value))
  }

  const handleClearFilters = () => {
    setItemType('')
    dispatch(getAllItemsAsync())
  }

  const handleSearchText = (e) => {
	const searchInput = e.target.value

    if (e.keyCode === 13) {
      let rList = [];
	  dispatch(applySearchTextAsync(JSON.stringify({ searchText: searchInput, rateList: rList})))
    }
  }

  const handleDoNothing = (e) => {
  }

  const Option = (props) => {
	return (
	  <div>
		<components.Option {...props}>
		  <input
			type="checkbox"
			checked={props.isSelected}
			onChange={() => null}
		  />{" "}
		  <label>{props.label}</label>
		</components.Option>
	  </div>
	);
  };


  const handleChange = (selected) => {
    this.setState({
      optionSelected: selected
    });
  };

  return (
    <>
      <div className="search">
        <div className="filters">
			<input
			id="outlined-basic"
			label="Search"
			placeholder="Press Enter to Search"
			onKeyDown={handleSearchText}
			/>
			 <ReactSelect
				options={colourOptions}
				isMulti
				closeMenuOnSelect={false}
				hideSelectedOptions={false}
				components={{
					Option
				}}
				onChange={handleChange}
				allowSelectAll={true}
				value={"this.state.optionSelected"}
			/>
      
          <Form.Group >
            <Form.Select value={itemType} onChange={handleCategory}>
              <option>Select item type...</option>
              {itemTypeDropdowns}
            </Form.Select>
          </Form.Group>
          <Button variant="outline-primary" type="submit" className="me-1 button reset-filter" onClick={handleClearFilters}>Clear Filters</Button>
        </div>

      </div>
    </>
  )
}

export default Search
