import React from 'react'

const Regions = (props) => {
    return (
        <div>
            <h4 className="mt-3">Details of Your Region</h4>
            {props.Regions && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>capital</th>
                            <th>cca2</th>
                            <th>cca3</th>
                            <th>cioc</th>
                            <th>currencies</th>
                            <th>population</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.Regions.map((region) => (
                            <tr key={`${region.cca2}region${region.cca3}`}>
                                <td>{region.name.official}</td>
                                <td>{region.capital}</td>
                                <td>{region.cca2}</td>
                                <td>{region.cca3}</td>
                                <td>{region.cioc}</td>
                                <td>{Object.keys(region.currencies)}</td>
                                <td>{region.population}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    )
}

export default Regions
