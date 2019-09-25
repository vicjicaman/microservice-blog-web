import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const State = state => {
  const [isOpen, setModalState] = useState(state);
  const close = () => setModalState(false);
  const open = () => setModalState(true);

  return { open, close, isOpen };
};

const Component = ({
  trigger: TriggerButton,
  confirm: ConfirmButton,
  state: { close, open, isOpen },
  body
}) => (
  <React.Fragment>
    <TriggerButton open={open} />
    <Modal isOpen={isOpen} toggle={close}>
      <ModalHeader toggle={close}>
         Confirmation...
      </ModalHeader>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>
        <ConfirmButton close={close} />{" "}
        <Button color="secondary" onClick={close}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  </React.Fragment>
);


export {State, Component}
