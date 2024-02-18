import { useState, useEffect } from "react";
import { callJSONServerAPI } from "../../domain/api";
import { useParams } from "react-router-dom";
import classes from "./style.module.scss";
import Navbar from '../../components/Navbar';

const DetailPage = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await callJSONServerAPI(`/password/${id}`, "GET")
            setData(response);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <>
            <Navbar />
            <h2>
                Detail Page
            </h2>
            <div className={classes["detail-page-container"]}>
                <h2 className={classes["detail-heading"]}>
                    Details Page
                </h2>
                <div className={classes["detail-item"]}>
                    <div className={classes["detail-label"]}>Email:</div>
                    <div className={classes["detail-value"]}>{data?.email}</div>
                </div>
                <div className={classes["detail-item"]}>
                    <div className={classes["detail-label"]}>Provider:</div>
                    <div className={classes["detail-value"]}>{data?.provider}</div>
                </div>
                <div className={classes["detail-item"]}>
                    <div className={classes["detail-label"]}>Category:</div>
                    <div className={classes["detail-value"]}>{data?.category}</div>
                </div>
            </div>
        </>
    )
}

export default DetailPage