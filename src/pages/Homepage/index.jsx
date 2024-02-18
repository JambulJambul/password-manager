import { useState, useEffect } from 'react'
import classes from './style.module.scss';
import { callJSONServerAPI } from '../../domain/api';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function Homepage() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    navigate(`/${selectedValue}`);
  };

  const fetchData = async () => {
    try {
      let response
      if (category == "family") {
        response = await callJSONServerAPI('/password?category=family', "GET")
      } else if (category == "personal") {
        response = await callJSONServerAPI('/password?category=personal', "GET")
      } else if (category == "work") {
        response = await callJSONServerAPI('/password?category=work', "GET")
      } else {
        response = await callJSONServerAPI("/password", "GET")
      }
      const modifiedResponse = response?.map((item) => ({
        id: item.id,
        provider: item.provider,
        email: item.email,
        category: item.category,
      }));
      setData(modifiedResponse);
    } catch (error) {
      console.log(error)
    }
  }

  const deleteData = async (id) => {
    try {
      await callJSONServerAPI(`/password/${id}`, "DELETE")
      handleClose();
      fetchData();
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <>
      <Navbar/>
      {console.log(category)}
      <div className={classes["page-container"]}>
        <h2>
          Home
        </h2>
      </div>
      <Link to={'/create-account'}>
        <button className={classes['create-account-button']}>
          Create Account
        </button>
      </Link>
      <select className={classes["category-dropdown"]} name="category-selector" id="category-selector" onChange={handleCategoryChange}>
        <option value="">All</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="family">Family</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Email</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td>{item.provider}</td>
              <td>{item.email}</td>
              <td>{item.category}</td>
              <td className={classes["action-row"]}>
                <button onClick={() => handleOpen(item.id)}><DeleteIcon /></button>
                <Link to={`/details/${item.id}`}><button>DETAILS</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={classes["modal-box"]}>
          <h4>Confirm Deletion</h4>
          <p>Are you sure you want to delete this account?</p>
          <div className={classes["modal-button-box"]}>
            <button onClick={handleClose}>
              Cancel
            </button>
            <button onClick={() => deleteData(deleteId)}>
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
export default Homepage
