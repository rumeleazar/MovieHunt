import React,{useState, useEffect} from "react";
import styles from './Loader.module.css';


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
    <div className={styles.preloaderContainer}> 
        <div className={styles.preloader}/>
    </div>
   
  ) : null;
}

export default LoadingSpinner