
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";

import useRestaurantMenu from "../utils/useRestaurantMenu";

import RestaurantCategory from "./RestaurantCategory"; 

import { useState } from "react";


const RestaurantMenu=()=>{
 

    const [showIndex,setShowIndex]=useState(null);

    const {resId}=useParams();


    const resInfo= useRestaurantMenu(resId);                                       


    if(resInfo===null)
    {
        return <Shimmer/>
    }

    const{name,cuisines,costForTwoMessage}=resInfo?.cards[2]?.card?.card?.info;



    const {itemCards}=resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;


    const categories=resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c=>c?.card?.["card"]?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")

    
        return(
 
        <div className="text-center">

            <h1 className="font-bold mt-8 mb-3 text-2xl">{name}</h1>
            <p className="font-bold text-lg">Cuisines: {cuisines.join(",")} - {costForTwoMessage}</p>
 
            
            {   

                categories.map((category,index)=><RestaurantCategory key={category?.card?.card.title} data={category?.card?.card} 

                    
                    showItems={index===showIndex? true:false}  

                    setShowIndex={()=>{
                        showIndex===null?setShowIndex(index):setShowIndex(null);
                        }}
            />) 
            }
        </div>
    )
}

export default RestaurantMenu;