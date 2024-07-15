
function useClipboard(){
    function setClipboard(val){
        navigator.clipboard.writeText(val);   

    }
    return setClipboard;
}

export default useClipboard;