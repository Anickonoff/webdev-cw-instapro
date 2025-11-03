import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";
  const render = () => {
    // @TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
          <div class="form">
              <h3 class="form-title">
                  Добавление поста
              </h3>
              <div class="form-inputs">
                  <div class="upload-image-container"></div>
                  <input type="text" id="description-input" class="input" placeholder="Описание" />
                  <div class="form-error"></div>
                  <button class="button" id="add-button">Добавить</button>
              </div>
          </div>
    </div>
  `;

    appEl.innerHTML = appHtml;

    const setError = (message) => {
      appEl.querySelector(".form-error").textContent = message;
    };

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    const uploadImageContainer = appEl.querySelector(".upload-image-container");
    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: uploadImageContainer,
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    document.getElementById("add-button").addEventListener("click", () => {
      setError("");
      const description = document.getElementById("description-input").value;
      if (!description) {
        setError("Введите описание поста");
        return;
      }

      if (!imageUrl) {
        setError("Не выбрана фотография");
        return;
      }

      onAddPostClick({
        description: description,
        imageUrl: imageUrl,
      });
    });
  };

  render();
}
