export const getApiUrl = (tabIndex?: number, pageNumber?: number) => {
    if(tabIndex === 0) return pageNumber ? `/todo?page=${pageNumber}` : '/todo'
    if(tabIndex === 2) return pageNumber ?  `/todo/pending?page=${pageNumber}` : '/todo/pending'
    if(tabIndex === 1) return pageNumber ? `/todo/completed?page=${pageNumber}` : '/todo/completed'
    return '/todo'
}

export const tabs = [
    {
        labelName: 'all',
        index: 0,
        dataTestid: 'tab-all'
    },
    {
        labelName: 'incomplete',
        index: 2,
        dataTestid: 'tab-incomplete'
    },
    {
        labelName: 'completed',
        index: 1,
        dataTestid: 'tab-completed'
    },

]

export const onfileupload = ( e:any, setImageString: any, onChange: any ) => {
    const reader = new FileReader();
    reader.onloadend =  () => {
      const imageString = reader.result
      setImageString(imageString) 
    }
    reader.readAsDataURL(e.target.files[0])
    onChange (e.target.files[0])
    
  }

