import { Modal } from 'antd'

import type { ModalProps } from 'antd'

const PaddingModal: React.FC<ModalProps> = (props) => (
  <Modal
    {...props}
  >
    <div className="pr-4">
      {props.children}
    </div>
  </Modal>
)

export default PaddingModal
