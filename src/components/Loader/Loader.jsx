import React,{useState, useEffect} from "react";
import './Loader.css';


export let setLoadingIndicatorVisibility;

const LoadingSpinner = (showOnMount = true) => {
    const [showLoader, setShowLoader] = useState(showOnMount);

    useEffect(() => {
        setLoadingIndicatorVisibility = setShowLoader;

        return ()=> {
            setLoadingIndicatorVisibility = null
        }
    }, [])

  return showLoader ?  (
    <div className="preloader-container"> 
        <div className="preloader"/>
    </div>
   
  ) : null;
}

export default LoadingSpinner