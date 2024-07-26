import { Text, Button, Modal } from "@mantine/core";

function SuccessMessage({ booking, onClose, onRefetch }) {
  return (
    <div>
      <Modal
        opened={true}
        onClose={() => {
          onRefetch();
          onClose();
        }}
        title="Đã huỷ đặt chỗ"
        centered
      >
        <div style={{ textAlign: "center" }}>
          <Text fw={700} size="lg">
            {booking.studios.name}
          </Text>
          <Text>Đặt chỗ của bạn đã được huỷ thành công.</Text>
          <Button
            style={{ marginTop: "20px" }}
            onClick={() => {
              onRefetch();
              onClose();
            }}
            color="blue"
          >
            Xong
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default SuccessMessage;
