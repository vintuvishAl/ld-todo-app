export const WithLoadingIndicator = (Component: any) => {
    return (props: any) => {
        const {isLoading, ...more} = props
        if (!isLoading) {
            return <Component {...more}/>
        }
    
        return (
            <p>
                Loading...
            </p>
        )
    }
}