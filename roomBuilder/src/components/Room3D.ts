import type {RoomDimensions} from '../types/Room';

export class RoomDimensionsInput {
  private dimensions: RoomDimensions = {
    width: 0, 
    length: 0, 
    height: 0
  };
  private onDimensionsChange?: (dimensions: RoomDimensions) => void;

  constructor(onDimensionsChange?: (dimensions: RoomDimensions) => void) {
    this.onDimensionsChange = onDimensionsChange;
  }

  createInputForm(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'room-dimensions-form';

    container.innerHTML = `
      <div class = "form-section">
        <h3>Room Dimensions</h3>
        <div class = "input-group">
          <label for = "width">Width (ft):</label>
          <input type = "number" id = "width" min = "1" max = "50" step = "0.1" placeholder = "12">
        </div>
        <div class = "input-group">
          <label for = "length">Length (ft):</label>
          <input type = "number" id = "length" min = "1" max = "50" step = "0.1" placeholder = "12">
        </div>
        <div class = "input-group">
          <label for = "height">Height (ft):</label>
          <input type = "number" id = "height" min = "6" max = "20" step = "0.1" placeholder = "9">
        </div>
        <div class - "input-group">
          <label for = "room-type">Room Type:</label>
          <select id = "room-type">
            <option value = "living">Living Room</option>
            <option value = "bedroom">Bedroom</option>
            <option value = "bathroom">Bathroom</option>
            <option value = "hallway>Hallway</option>
            <option value = "kitchen">Kitchen</option>
            <option value = "office">Office</option>
            <option value = "guest">Guest</option>
            <option value = "dining">Dining</option>
            <option value = "other">Other</option>
          </select>
        </div>
        <button id = "create-room" class - "btn-primary">
      </div>
    `;
    this.setupEventListeners(container);
  }

  private setupEventListeners(container: HTMLDivElement): void {
    const createRoomBtn = container.querySelector('#create-room') as HTMLButtonElement;
    createRoomBtn.addEventListener('click', () => {
      this.handleCreateRoom();
    });

    const inputs = container.querySelectorAll('input[type = "number"]');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        this.validateInputs();
      });
    });
  }

  private handleCreateRoom(): void {
    const width = parseFloat((document.getElementById('width') as HTMLInputElement).value);
    const length = parseFloat((document.getElementById('length') as HTMLInputElement).value);
    const height = parseFloat((document.getElementById('height') as HTMLInputElement).value);

    if (this.validateDimensions(width, length, height)) {
      this.dimensions = {
        width,
        length,
        height
      };
      this.onDimensionsChange?.(this.dimensions);
    }
  }

  private validateDimensions(width: number, length: number, height: number): boolean {
    if (width <= 0 || length <= 0 || height <= 0) {
      alert('All dimensions must be greater than 0');
      return false;
    }
    if (width > 50 || length > 50 || height > 20) {
      alert('Dimensions are too large. Maximum: 50ft x 50ft x 20ft');
      return false;
    }
    return true;
  }

  private validateInputs(): void {
    const createBtn = document.getElementById('create-room') as HTMLButtonElement;
    const width = (document.getElementById('width') as HTMLInputElement).value;
    const length = (document.getElementById('length') as HTMLInputElement).value;
    const height = (document.getElementById('height') as HTMLInputELement).value;
    
    createBtn.disabled = !(width && length && height);
  }

  getDimensions(): RoomDimensions {
    return this.dimensions;
  }
}