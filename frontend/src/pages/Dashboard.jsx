import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { Table, Button, Form, Modal, Container, Card, Alert } from 'react-bootstrap';
import { addSweet, getSweets, searchSweets, updateSweet, deleteSweet, purchaseSweet, restockSweet } from '../services/sweetsService';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [sweets, setSweets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentSweet, setCurrentSweet] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      const res = await getSweets();
      setSweets(res.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch sweets');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await searchSweets(`name=${searchQuery}`);
      setSweets(res.data);
    } catch (err) {
      setError(err.message || 'Search failed');
    }
  };

  const handleAdd = () => {
    setCurrentSweet({});
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = (sweet) => {
    setCurrentSweet(sweet);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (isEdit) {
        await updateSweet(currentSweet._id, currentSweet);
      } else {
        await addSweet(currentSweet);
      }
      fetchSweets();
      setShowModal(false);
    } catch (err) {
      setError(err.message || 'Save failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSweet(id);
      fetchSweets();
    } catch (err) {
      setError(err.message || 'Delete failed');
    }
  };

  const handlePurchase = async (id) => {
    const quantity = prompt('Enter quantity to purchase:');
    if (quantity && !isNaN(quantity) && quantity > 0) {
      try {
        await purchaseSweet(id, parseInt(quantity));
        fetchSweets();
      } catch (err) {
        setError(err.message || 'Purchase failed');
      }
    }
  };

  const handleRestock = async (id) => {
    const quantity = prompt('Enter quantity to restock:');
    if (quantity && !isNaN(quantity) && quantity > 0) {
      try {
        await restockSweet(id, parseInt(quantity));
        fetchSweets();
      } catch (err) {
        setError(err.message || 'Restock failed');
      }
    }
  };

  const handleChange = (e) => {
    setCurrentSweet({ ...currentSweet, [e.target.name]: e.target.value });
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Welcome, {user?.username} ({user?.role})</Card.Title>
          <Button variant="danger" onClick={logout} className="mb-3">Logout</Button>
          <hr />
          <h3>Sweets Management</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSearch} className="mb-3 d-flex">
            <Form.Control
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="me-2"
            />
            <Button type="submit" variant="primary">Search</Button>
          </Form>
          <Button variant="success" onClick={handleAdd} className="mb-3">Add Sweet</Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sweets.map((sweet) => (
                <tr key={sweet._id}>
                  <td>{sweet.name}</td>
                  <td>{sweet.category}</td>
                  <td>${sweet.price}</td>
                  <td>{sweet.quantity}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(sweet)}
                      className="me-2 mb-1"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handlePurchase(sweet._id)}
                      className="me-2 mb-1"
                    >
                      Purchase
                    </Button>
                    {user.role === 'admin' && (
                      <>
                        <Button
                          variant="info"
                          onClick={() => handleRestock(sweet._id)}
                          className="me-2 mb-1"
                        >
                          Restock
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(sweet._id)}
                          className="mb-1"
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header>
              <Modal.Title>{isEdit ? 'Edit Sweet' : 'Add Sweet'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={currentSweet.name || ''}
                    onChange={handleChange}
                    placeholder="Enter sweet name"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    name="category"
                    value={currentSweet.category || ''}
                    onChange={handleChange}
                    placeholder="Enter category"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    name="price"
                    type="number"
                    value={currentSweet.price || ''}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    name="quantity"
                    type="number"
                    value={currentSweet.quantity || ''}
                    onChange={handleChange}
                    placeholder="Enter quantity"
                    required
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;