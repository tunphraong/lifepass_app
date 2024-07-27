import { Text, Button, Modal } from "@mantine/core";

function ErrorMessage({ errorMessage, onClose }) {
  return (
    <div>
      <Modal
        opened={true}
        onClose={onClose}
        title="Huỷ lớp thất bại"
        centered
      >
        <div style={{ textAlign: "center" }}>
          <Text>{errorMessage}</Text>
          <Button style={{ marginTop: "20px" }} onClick={onClose} color="red">
            Đóng
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default ErrorMessage;
