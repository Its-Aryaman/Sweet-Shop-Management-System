import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { Table, Button, Form, Modal, Container, Card, Alert, Spinner } from 'react-bootstrap';
import { addSweet, getSweets, searchSweets, updateSweet, deleteSweet, purchaseSweet, restockSweet } from '../services/sweetsService';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [sweets, setSweets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [currentSweet, setCurrentSweet] = useState({});
  const [purchaseSweetId, setPurchaseSweetId] = useState(null);
  const [restockSweetId, setRestockSweetId] = useState(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState('');
  const [restockQuantity, setRestockQuantity] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    setLoading(true);
    try {
      const res = await getSweets();
      setSweets(res.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch sweets');
    } finally {
      setLoading(false);
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

  const handlePurchase = (id) => {
    setPurchaseSweetId(id);
    setPurchaseQuantity('');
    setShowPurchaseModal(true);
  };

  const handlePurchaseSubmit = async () => {
    const quantity = parseInt(purchaseQuantity);
    if (!quantity || quantity <= 0) {
      setError('Please enter a valid buy quantity');
      return;
    }
    try {
      await purchaseSweet(purchaseSweetId, quantity);
      fetchSweets();
      setShowPurchaseModal(false);
      setPurchaseQuantity('');
      setError('');
    } catch (err) {
      setError(err.message || 'Buy failed');
    }
  };

  const handleRestock = (id) => {
    setRestockSweetId(id);
    setRestockQuantity('');
    setShowRestockModal(true);
  };

  const handleRestockSubmit = async () => {
    const quantity = parseInt(restockQuantity);
    if (!quantity || quantity <= 0) {
      set |Error('Please enter a valid restock quantity');
      return;
    }
    try {
      await restockSweet(restockSweetId, quantity);
      fetchSweets();
      setShowRestockModal(false);
      setRestockQuantity('');
      setError('');
    } catch (err) {
      setError(err.message || 'Restock failed');
    }
  };

  const handleChange = (e) => {
    setCurrentSweet({ ...currentSweet, [e.target.name]: e.target.value });
  };

  const handleClosePurchaseModal = () => {
    setShowPurchaseModal(false);
    setPurchaseQuantity('');
    setError('');
  };

  const handleCloseRestockModal = () => {
    setShowRestockModal(false);
    setRestockQuantity('');
    setError('');
  };

  return (
    <Container className="mt-4">
      <Card className="animation: fadeIn 0.5s">
        <Card.Body>
          <Form onSubmit={handleSearch} className="mb-3 d-flex">
            <Form.Control
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="me-2"
            />
            <Button
              variant="custom-primary"
              type="submit"
              className="d-flex align-items-center justify-content-center gap-2"
              aria-label="Search sweets"
            >
              <svg
                className="bi"
                width="16"
                height="16"
                fill="currentColor"
                aria-hidden="true"
              >
                <use xlink:href="#search" />
              </svg>
              Search
            </Button>
          </Form>
          <h3 className="mb-3">Sweets Management</h3>
          {loading && (
            <Alert variant="info" className="d-flex align-items-center">
              <Spinner animation="border" size="sm" className="me-2" />
              Loading sweets...
            </Alert>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
          <Button
            variant="custom-purple"
            onClick={handleAdd}
            className="mb-3 d-flex align-items-center justify-content-center gap-2 btn-lg bd-btn-lg btn-bd-primary fw-semibold"
            aria-label="Add new sweet"
          >
            <svg
              className="bi"
              width="16"
              height="16"
              fill="currentColor"
              aria-hidden="true"
            >
              <use xlink:href="#plus-circle" />
            </svg>
            Add Sweet
          </Button>
          <div className="table-responsive">
            <Table hover>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sweets.map((sweet, index) => (
                  <tr key={sweet._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{sweet.name}</td>
                    <td>{sweet.category}</td>
                    <td>${sweet.price}</td>
                    <td>{sweet.quantity}</td>
                    <td>
                      <div className="d-flex gap-2 flex-wrap">
                        <Button
                          variant="dark-purple"
                          size="sm"
                          onClick={() => handleEdit(sweet)}
                          className="d-flex align-items-center"
                          aria-label="Edit sweet"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pencil-fill me-1"
                            viewBox="0 0 16 16"
                            data-testid="edit-icon"
                          >
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                          </svg>
                          Edit
                        </Button>
                        <Button
                          variant="dark-purple"
                          size="sm"
                          onClick={() => handlePurchase(sweet._id)}
                          className="d-flex align-items-center"
                          aria-label="Buy sweet"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-box2-heart me-1"
                            viewBox="0 0 16 16"
                            data-testid="buy-icon"
                          >
                            <path d="M8 7.982C9.664 6.309 13.825 9.236 8 13 2.175 9.236 6.336 6.31 8 7.982"/>
                            <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4zm0 1H7.5v3h-6zM8.5 4V1h3.75l2.25 3zM15 5v10H1V5z"/>
                          </svg>
                          Buy
                        </Button>
                        {user.role === 'admin' && (
                          <>
                            <Button
                              variant="dark-purple"
                              size="sm"
                              onClick={() => handleRestock(sweet._id)}
                              className="d-flex align-items-center"
                              aria-label="Restock sweet"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-bootstrap-reboot me-1"
                                viewBox="0 0 16 16"
                                data-testid="restock-icon"
                              >
                                <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.8 6.8 0 0 0 1.16 8z"/>
                                <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324z"/>
                              </svg>
                              Restock
                            </Button>
                            <Button
                              variant="dark-purple"
                              size="sm"
                              onClick={() => handleDelete(sweet._id)}
                              className="d-flex align-items-center"
                              aria-label="Delete sweet"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-trash me-1"
                                viewBox="0 0 16 16"
                                data-testid="delete-icon"
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                              </svg>
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Edit/Add Modal */}
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
              <Button variant="dark-purple" onClick={() => setShowModal(false)} aria-label="Cancel">
                Cancel
              </Button>
              <Button
                variant="dark-purple"
                onClick={handleSave}
                className="d-flex align-items-center justify-content-center gap-2"
                aria-label="Save sweet"
              >
                <svg
                  className="bi"
                  width="16"
                  height="16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <use xlink:href="#save" />
                </svg>
                Save
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Buy Modal */}
          <Modal show={showPurchaseModal} onHide={handleClosePurchaseModal} centered>
            <Modal.Header>
              <Modal.Title>Buy Sweet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={purchaseQuantity}
                    onChange={(e) => setPurchaseQuantity(e.target.value)}
                    placeholder="Enter quantity to buy"
                    required
                    min="1"
                  />
                  <Form.Text className="text-muted">
                    Enter a positive number (e.g., 1 or more).
                  </Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark-purple" onClick={handleClosePurchaseModal} aria-label="Cancel">
                Cancel
              </Button>
              <Button variant="dark-purple" onClick={handlePurchaseSubmit} aria-label="Confirm buy">
                Buy
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Restock Modal */}
          <Modal show={showRestockModal} onHide={handleCloseRestockModal} centered>
            <Modal.Header>
              <Modal.Title>Restock Sweet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={restockQuantity}
                    onChange={(e) => setRestockQuantity(e.target.value)}
                    placeholder="Enter quantity to restock"
                    required
                    min="1"
                  />
                  <Form.Text className="text-muted">
                    Enter a positive number (e.g., 1 or more).
                  </Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark-purple" onClick={handleCloseRestockModal} aria-label="Cancel">
                Cancel
              </Button>
              <Button variant="dark-purple" onClick={handleRestockSubmit} aria-label="Confirm restock">
                Restock
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;