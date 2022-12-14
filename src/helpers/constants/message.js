export const MESSAGES = {
  UNAUTHORIZED:
    'Тільки зареєстровані користувачі можуть залишати повідомлення.Будь-ласка зайдіть або зареєструйстесь.',
  NO_RIGHTS: 'Сторінка доступна тільки користувачам з роллю адміністратора',
  NO_UNPUBLISHED_ARTICLES: 'Наразі немає неопублікованих статей',
  NO_CATEGORY_ARTICLES: 'Наразі у цій категорії немає статей',
  NO_UNPUBLISHED_COMMENTS: 'Наразі немає неопублікованих коментарів',
  EMAIL_SENT: 'Письмо було відправлено. Перевірте почту для відновлення паролю',
  PASSWORD_UPDATE: 'Пароль було оновлено',
  PASSWORDS_NOT_MATCH: 'Паролі не збігаються',
  COMMENT_ADDED: 'Коментар надіслано. Він буде доданий після підтвердження адміністратора.',
  USER_BLOCKED: 'На жаль, ви заблоковані, і ця дія для вас недоступна.',
};

export const MESSAGE_TYPE = {
  MAIN: 'main',
  LOGIN: 'login',
};

export const ERROR_MESSAGES = {
  EMAIL: 'Hевірний e-mail',
  PASSWORD: 'Hевірний пароль',
  SERVER_ERROR: 'Помилка на сервері',
  FAILED_400: 'Request failed with status code 400',
  FAILED_404: 'Request failed with status code 404',
  USER_NO_EXIST: 'Користувача з таким e-mail не існує.',
};

export const HELPER_TEXT = {
  EMAIL_PLACEHOLDER: 'mango@gmail.com',
  PASS_PLACEHOLDER: 'Мінімум 8 символів',
  TITLE_TIP: "Заголовок є обов'язковим полем і може містити максимум 255 символів",
  URL_TIP: 'Будь ласка, використовуйте дефіс замість пробілів або спеціальних символів',
  SPOILER_TIP: "Спойлер є обов'язковим полем і може містити максимум 100 символів",
  CATEGORY_TIP: 'Назва повинна починатися з великої літери',
};

export const CONFIRM_MESSAGE = {
  PUBLISH: 'Ви впевнені, що хочете це опублікувати?',
  UNPUBLISH: 'Ви впевнені, що хочете скасувати публікацію?',
  DELETE: 'Ви впевнені, що хочете видалити це?',
  UPDATE_ROLE: 'Ви впевнені, що хочете змінити роль користувача?',
  BLOCK_USER: 'Ви впевнені, що хочете заблокувати користувача?',
  UNBLOCK_USER: 'Ви впевнені, що хочете розблокувати користувача?',
};
