import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  clearFilterHandler,
  fetchHotelSearchPrice,
  getClearFilters,
  getHotelFilters,
  getHotelPriceFilters,
  getHotelSearched,
  getLoading,
  getNoRooms,
  hotelSearchAsync,
  resetPriceLoading,
} from "../../../features/bookings/hotelSlice";
import { scrollFunc } from "../../../helpers/helper";
import Loader from "../../../helpers/Loader";
import { errorToast } from "../../../helpers/toaster";
import Fliter from "../../common/filter/Fliter";
import PriceFilter from "../../common/filter/PriceFilter";
import StarRating from "../../common/filter/StarRating";
import HotelList from "./HotelList";
import NoRooms from "./NoRooms";

const Hotel = () => {
  const [searchParams] = useSearchParams();
  const [val, setVal] = useState([]);
  const [uiLoader,setUiLoader] = useState(false);
  const [max,setMax] = useState(100)
  const [min,setMin] = useState(0)

  const [queryData, setQueryData] = useState(
    Object.fromEntries([...searchParams])
  );
  const dispatch = useDispatch();
  const hotelRef = React.useRef("");
  const priceRangeRef = React.useRef("100");
  const priceFilterRef = React.useRef(null);

  let loading = useSelector(getLoading);
  const hotelSearched = useSelector(getHotelSearched);
  const clearFilter = useSelector(getClearFilters);
  const hotelsPrice = useSelector((state) => state.hotel.hotelsPrice);
  const noRooms = useSelector(getNoRooms);
  const starFilter = useSelector(getHotelFilters);
  const hotelPriceFilter = useSelector(getHotelPriceFilters);
  const [backup,setBackup] = useState([])
  const [starFlag,setStarFlag] = useState(false);
  const [priserangeval,setPriserangeval] = useState(0);


  useEffect(() => {
    const HotelForm = JSON.parse(sessionStorage.getItem("hotelForm"));
    if (hotelsPrice.length > 0) {
      dispatch(fetchHotelSearchPrice(HotelForm));
      dispatch(hotelSearchAsync(HotelForm));
    }
  }, []);

  const getPrice = (code) => {
    let val = hotelsPrice.filter((ele) => {
      return parseInt(ele.HotelCode) === parseInt(code);
    });
    return val;
  };

  useEffect(() => {
    if (Object.keys(queryData).length > 0) {
     
      dispatch(fetchHotelSearchPrice(queryData));
      dispatch(hotelSearchAsync(queryData));
    }
  }, [queryData]);
 
 const priceFilter = (hotelSearched) =>{
    let arr = []

   let priced = hotelSearched.filter((ele) => getPrice(ele.code).length > 0)
   priced.map((hotel,ind)=>{
      hotelsPrice.map( (ele) => {
        if(parseInt(hotel.code)===parseInt(ele.HotelCode)){
          // hotel.pricedata = ele;
          priced[ind] = {...priced[ind],priceDatas: ele.Rooms[0].TotalFare}  
        }  
        });
    })
     


    setTimeout(()=>{

    
    let max = Math.max( Math.max(...priced.map(o => o.priceDatas))) 
    let min = Math.min( Math.min(...priced.map(o => o.priceDatas)))
    setMax(0)
    if(max > 0){
      setMax(max)
      setMin(min)
      setPriserangeval(max)
      priceRangeRef.current.value = max;
    }
  },500)

   arr = [...priced,...hotelSearched.filter((ele) => !getPrice(ele.code).length > 0)]
    
   setVal(arr);
   setBackup(arr)
   
 }
 React.useMemo(()=>{

    priceFilter(hotelSearched)    

 },[hotelsPrice]) 
 React.useMemo(()=>{

    priceFilter(hotelSearched)    

},[hotelSearched]) 


const filters = () =>{

     var filterFrom = backup;
    if(clearFilter){
      hotelRef.current.value = '';
      // console.log(priceRangeRef.current.value)
      priceRangeRef.current.value = max;
      setPriserangeval(max)
      setVal(backup);
      dispatch(clearFilterHandler(false));
      return;
    }
    //name filter
    if(hotelRef.current.value !==''&& hotelRef.current.value !== null && hotelRef.current.value !== undefined ){
      filterFrom = [
        ...filterFrom.filter((ele)=> ele.name.toLowerCase().includes(hotelRef.current.value.toLowerCase()))
      ]
    }
  
    //star filter   
    if(starFilter.length > 0){    
      filterFrom = [
        ...filterFrom.filter((ele) => starFilter.includes(ele.rating))
      ]; 
    }

    //price Range filter 
    if(priceRangeRef.current.value > 0){
      filterFrom = [
        ...filterFrom.filter((ele)=> 
          (parseFloat(ele.priceDatas) <= parseFloat(priceRangeRef.current.value))
        )
      ]
    }


    //price Filter 

    if(priceFilterRef.current === "mintomax"){
      filterFrom = [...filterFrom.sort((a, b) => parseFloat(a.priceDatas) - parseFloat(b.priceDatas))]
    }
    if(priceFilterRef.current === "maxtomin"){
      filterFrom = [...filterFrom.sort((a, b) => parseFloat(b.priceDatas) - parseFloat(a.priceDatas))]
    }
    // pricewise filtering 
    
    console.log("hotelPriceFilter.length",hotelPriceFilter);
    if(hotelPriceFilter.length > 0 && hotelPriceFilter !== undefined){
      
        var arr = []
        hotelPriceFilter.map((val)=>{
          let max= parseInt(val.split("-")[1]);
          if(typeof(val.split("-")[1]) ==='undefined'){
            max = 9999999999999999999999999999999;
          }
          arr.push(
            ...filterFrom.filter((ele)=>  ele.priceDatas >= parseInt(val.split("-")[0]) &&  ele.priceDatas <= max)
          )
        })
      
        filterFrom = arr;

     

    }
    console.log("filterFrom",filterFrom)
    // setTimeout(() => {
      checkfilters(filterFrom)
    // }, 1000);

}

  const checkfilters = (newArr) => {
    if(starFilter.length===0 && hotelRef.current.value !==''&&  hotelPriceFilter.length <= 0 &&  priceFilterRef.current === '' && hotelPriceFilter.length <= 0 ){
      setVal(backup);
    }
    else{
      if(newArr.length === 0){
       
      }
      setVal(newArr);
    }
  }

  React.useEffect(() => {
    if(starFilter.length>0){
      setStarFlag(true);
      return filters();
    }
    if(starFlag === true){
      setStarFlag(false)
      return filters();
    }

  }, [starFilter]);

 
 
  var timers = ''; 
  const NameFilter = (name) => {
    clearTimeout(timers);    
    timers = setTimeout(() => {  
      return filters();
    }, 500);   
  }
  const handleName=(e)=>{ 
      hotelRef.current.value = e.target.value;   
      NameFilter(e.target.value)   
   }



   var pricetimer = ''; 
   var pricestatetimer = '';  

   const PriceRangeHandler = (e) => {
    
    priceRangeRef.current.value = e.target.value;
      clearTimeout(pricetimer);    
      pricetimer = setTimeout(() => {
        setPriserangeval( e.target.value)
        return filters();
      },1000);
      clearTimeout(pricestatetimer);    
      pricestatetimer = setTimeout(() => {
        setPriserangeval(e.target.value)       
      },100);
   }

   const PriceFilterHandler = (e) => {
    priceFilterRef.current = e.target.value
    return filters();
  }


useEffect(() => {
    return filters();
}, [hotelPriceFilter])




  useEffect(() => {
    if (noRooms) {
      errorToast("No Rooms Availible!");
    }
  }, [noRooms]);


  if (loading || uiLoader ) {
    return <Loader />;
  }
    else {
    return (
      <>
       
        <section className="hotel-listing-main">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <Fliter cityname={queryData.cityname} setVal={setVal} backup={backup} setUiLoader={setUiLoader} />
                <div className="filter-wrap categories-wrap-main mt-4">
                  <div className="filter-title">
                      <h4>Sreach by Name</h4>
                  </div>
                  <input className="form-control" type="text" ref={hotelRef}  onChange={handleName} placeholder="Search" />
                </div>
                <StarRating />
                
                <div className="filter-wrap categories-wrap-main mt-4">
                    <div className="filter-title">
                      <h4>Price Range</h4>
                    </div> 
                 <div className="range-filter">
                    <label>{min}</label>
                    <input type="range"   min={min} max={max}  ref={priceRangeRef} onChange={PriceRangeHandler} />  
                    <label>{max}</label>
                  </div>
                  <div className="range-filter-val">
                    <span className="current-pricerange">{priserangeval}</span>
                  </div>
                  
                </div>

                 <div className="filter-wrap categories-wrap-main mt-4">
                    <div className="filter-title">
                      <h4>Price Filter</h4>
                    </div>   
                    <div className="price-radio-input">     
                      <input type="radio" name="price" id="p1" value={"mintomax"}  onChange={PriceFilterHandler}/> 
                      <label htmlFor='p1'> Min to Max </label>
                    </div>
                    <div className="price-radio-input">
                      <input type="radio" name="price" id="p2" value={"maxtomin"} onChange={PriceFilterHandler}/> 
                      <label htmlFor='p2'> Max to Min </label>
                    </div>
                 </div>

                 <PriceFilter/>

              </div>
            
              <div className="col-lg-9 mt-4">
                {val?.length > 0 
                  ? val.map((ele, ind) => {
                      return (
                        <HotelList
                          key={ind}
                          priced={hotelsPrice}
                          vals={ele}
                          qData={queryData}
                          hotelPrice = {ele.priceDatas !== undefined &&  ele.priceDatas}
                        />
                      );
                    })
                  : noRooms || val.length === 0  && <NoRooms nohotel={val.length === 0 && true}/>}
              </div>
            </div>
          </div>
        </section>
      </>
    );
   }
};

export default Hotel;
