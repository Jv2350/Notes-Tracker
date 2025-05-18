import { useState, type Key } from "react";
import { Button, Card, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { TagBadge } from "../NoteForm/TagBadge";
import type { Tag } from "../../types/tag";
import { useFilteredNotes } from "../../hooks/useFilteredNotes";
import styles from "./NoteList.module.css";

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};

type EditTagsModalProps = {
  show: boolean;
  availableTags: Tag[];
  handleClose: () => void;
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};

export function NoteList({
  availableTags,
  notes,
  onUpdateTag,
  onDeleteTag,
}: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const filteredNotes = useFilteredNotes(notes, title, selectedTags);

  return (
    <>
      <Row className="align-items-center mb-4 fade-in">
        <Col>
          <h1
            style={{ fontWeight: 700, color: "#2563eb", letterSpacing: "-1px" }}
          >
            Notes
          </h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary" className="shadow-sm">
                Create
              </Button>
            </Link>
            <Button
              onClick={() => setEditTagsModalIsOpen(true)}
              variant="outline-secondary"
              className="shadow-sm"
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form className="fade-in">
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Search notes..."
                autoComplete="off"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={(tags) => {
                  setSelectedTags(
                    (tags ?? []).map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  );
                }}
                isMulti
                placeholder="Filter by tags..."
                classNamePrefix="react-select"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row
        xs={1}
        sm={2}
        lg={3}
        xl={4}
        className="g-3 fade-in"
        style={{ position: "relative", zIndex: 0 }}
      >
        {filteredNotes.length === 0 ? (
          <Col
            className="text-center text-muted pt-5"
            style={{ fontSize: "1.2rem" }}
          >
            No notes found.
          </Col>
        ) : (
          filteredNotes
            .filter(
              (note: { id: Key | null | undefined }) =>
                typeof note.id === "string" && note.id !== ""
            )
            .map(
              (note: {
                id: Key | null | undefined;
                title: string;
                tags: Tag[];
              }) => (
                <Col
                  key={note.id as string}
                  style={{ position: "relative", zIndex: 0 }}
                >
                  <NoteCard
                    id={note.id as string}
                    title={note.title}
                    tags={note.tags}
                  />
                </Col>
              )
            )
        )}
      </Row>
      <EditTagsModal
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        availableTags={availableTags}
      />
    </>
  );
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
      tabIndex={0}
      aria-label={`Open note: ${title}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map((tag) => (
                <TagBadge tag={tag} key={tag.id} />
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

function EditTagsModal({
  availableTags,
  handleClose,
  show,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    onClick={() => onDeleteTag(tag.id)}
                    variant="outline-danger"
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
