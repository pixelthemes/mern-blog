import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";

const DashboardBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  console.log(blogs);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({
    title: "",
    description: "",
    image: "",
  });

  // API Base URL
  const baseUrl = "http://localhost:2000/api";

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getAllBlog`);
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Open Modal for Create or Edit
  const handleShowModal = (blogs = null) => {
    setIsEditing(Boolean(blogs));
    setCurrentBlog(blogs || { title: "", description: "", image: "" });
    setShowModal(true);
  };

  // Close Modal
  const handleCloseModal = () => setShowModal(false);

  // Create or Update Blog
  const handleSaveBlog = async () => {
    try {
      if (isEditing) {
        await axios.put(
          `${baseUrl}/UpdateBlog/${currentBlog._id}`,
          currentBlog
        );
      } else {
        await axios.post(`${baseUrl}/CreateBlog`, currentBlog);
      }
      fetchBlogs();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  // Delete Blog
  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`${baseUrl}/DeleteBlog/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Manage Blogs</h2>
      <Button
        className="mb-4"
        variant="success"
        onClick={() => handleShowModal()}
      >
        + Add New Blog
      </Button>
      <Row>
        {blogs?.length > 0 ? (
          blogs?.map((blogs) => (
            <Col md={6} lg={4} className="mb-4" key={blogs._id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={blogs.image}
                  alt={blogs.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{blogs.title}</Card.Title>
                  <Card.Text>{blogs.description}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleShowModal(blogs)}
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteBlog(blogs._id)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No blogs found.</p>
        )}
      </Row>

      {/* Modal for Create & Edit */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Blog" : "Add New Blog"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBlogTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={currentBlog.title}
                onChange={(e) =>
                  setCurrentBlog({ ...currentBlog, title: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formBlogDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={currentBlog.description}
                onChange={(e) =>
                  setCurrentBlog({
                    ...currentBlog,
                    description: e.target.value,
                  })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formBlogImage" className="mt-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={currentBlog.image}
                onChange={(e) =>
                  setCurrentBlog({ ...currentBlog, image: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveBlog}>
            {isEditing ? "Update Blog" : "Create Blog"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashboardBlogs;
