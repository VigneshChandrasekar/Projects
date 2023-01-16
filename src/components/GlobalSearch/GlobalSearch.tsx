
export default function GlobalSearch(){
    return(
        <div className="col-sm-5 col-md-3">
            <form action="#" className="search-wrap">
                <div className="form-group">
                    <input type="search" className="form-control search" placeholder="Search" />
                    <button className="btn btn-primary submit-search text-center" type="submit">
                        <i className="icon-search"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};