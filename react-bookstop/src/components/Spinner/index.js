
export const Spinner = ( formStatus ) => {

    if (formStatus.props.showStatus) {
            return (
                <>
                { 
                    formStatus.props.showSpinner ? 
                    <div className="spinner-border text-danger bookstop-show" role="status">
                    <span className="sr-only">Loading...</span> 
                    { 
                        formStatus.props.message ? 
                        <div className="form-submit-status">{formStatus.props.message}</div> :
                        <div className="form-submit-status"></div> 
                    }
                    </div> : 
                    <div className="text-danger bookstop-show" role="status">
                    {
                        formStatus.props.message ? 
                        <div className="form-submit-status">{formStatus.props.message}</div> :
                        <div className="form-submit-status"></div> 
                    }
                    </div> 
                }
                </>
            )
    } else {
            return (
                <>
                <div className="bookstop-hide" role="status">
                </div>
                </>
            )
    }
}

export default Spinner;

