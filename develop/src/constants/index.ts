export enum FORM_NAME {
    REGISTRATION = 'REGISTRATION',
    SING_IN = 'SING_IN',
}

export const ERRORS_MAP = {
    'auth/claims-too-large': 'Предоставленная полезная нагрузка setCustomUserClaims()превышает максимально допустимый размер в 1000 байт.',
    'auth/email-already-exists': 'Предоставленный адрес электронной почты уже используется существующим пользователем. Каждый пользователь должен иметь уникальный адрес электронной почты.',
    'auth/id-token-expired': 'Срок действия предоставленного токена истек.',
    'auth/id-token-revoked': 'Токен был отозван.',
    'auth/insufficient-permission': 'У учетных данных, используемых для инициализации Admin SDK, недостаточно прав для доступа к запрашиваемому ресурсу аутентификации. Обратитесь к разделу Настройка проекта Firebase для получения документации о том, как создать учетные данные с соответствующими разрешениями и использовать их для аутентификации Admin SDK.',
    'auth/internal-error': 'Сервер аутентификации обнаружил непредвиденную ошибку при попытке обработать запрос. Сообщение об ошибке должно содержать ответ от сервера аутентификации, содержащий дополнительную информацию. Если ошибка не устранена, сообщите о проблеме на наш канал поддержки отчетов об ошибках .',
    'auth/invalid-argument': 'Недопустимый аргумент был предоставлен методу аутентификации. Сообщение об ошибке должно содержать дополнительную информацию.',
    'auth/invalid-claims': 'Предоставленные атрибуты пользовательских утверждений setCustomUserClaims() недействительны.',
    'auth/invalid-continue-uri': 'URL-адрес продолжения должен быть допустимой строкой URL-адреса.',
    'auth/invalid-creation-time': 'Время создания должно быть допустимой строкой даты UTC.',
    'auth/invalid-credential': 'Учетные данные, используемые для аутентификации Admin SDK, не могут использоваться для выполнения желаемого действия. Некоторые методы аутентификации , такие как createCustomToken()и verifyIdToken()требуют SDK для инициализации с сертификатом верительным в отличии от обновления маркеров или приложений по умолчанию учетных данных. Посмотрите Инициализировать SDK для документации о том, как аутентифицировать Admin SDK с учетными данными сертификата.',
    'auth/invalid-disabled-field': 'Предоставленное значение для disabled свойства пользователя недопустимо. Это должно быть логическое значение.',
    'auth/invalid-display-name': 'Предоставленное значение для displayName свойства пользователя недопустимо. Это должна быть непустая строка.',
    'auth/invalid-dynamic-link-domain': 'Предоставленный домен динамической ссылки не настроен или не авторизован для текущего проекта.',
    'auth/invalid-email-verified': 'Предоставленное значение для emailVerified свойства пользователя недопустимо. Это должно быть логическое значение.',
    'auth/invalid-hash-algorithm': 'Алгоритм хеширования должен соответствовать одной из строк в списке поддерживаемых алгоритмов.',
    'auth/invalid-hash-block-size': 'Размер блока хеша должен быть действительным числом.',
    'auth/invalid-hash-derived-key-length': 'Длина ключа, полученного из хэша, должна быть действительным числом.',
    'auth/invalid-hash-key': 'Ключ хеша должен быть действительным байтовым буфером.',
    'auth/invalid-hash-memory-cost': 'Стоимость хеш-памяти должна быть действительным числом.',
    'auth/invalid-hash-parallelization': 'Распараллеливание хеша должно быть действительным числом.',
    'auth/invalid-hash-rounds': 'Количество раундов должно быть действительным.',
    'auth/invalid-hash-salt-separator': 'Поле солевого разделителя алгоритма хеширования должно быть действительным байтовым буфером.',
    'auth/invalid-id-token': 'Предоставленный токен ID не является действительным токеном.',
    'auth/invalid-last-sign-in-time': 'Время последнего входа должно быть верной строкой даты UTC.',
    'auth/invalid-page-token': 'Предоставленный токен следующей страницы недействителен. Это должна быть допустимая непустая строка.',
    'auth/invalid-password': 'Предоставленное значение для password свойства пользователя недопустимо. Это должна быть строка длиной не менее шести символов.',
    'auth/invalid-password-hash': 'Хэш пароля должен быть действительным байтовым буфером.',
    'auth/invalid-password-salt': 'Соль пароля должна быть действительным байтовым буфером',
    'auth/invalid-phone-number': 'Предоставленное значение для phoneNumber недействительно. Это должна быть непустая строка идентификатора, соответствующая стандарту E.164.',
    'auth/invalid-photo-url': 'Предоставленное значение для photoURL свойства пользователя недопустимо. Это должен быть строковый URL.',
    'auth/invalid-provider-data': 'ProviderData должен быть допустимым массивом объектов UserInfo.',
    'auth/invalid-provider-id': 'ProviderId должен быть допустимой строкой идентификатора поддерживаемого поставщика.',
    'auth/invalid-session-cookie-duration': 'Продолжительность сеансового cookie должна быть действительным числом в миллисекундах от 5 минут до 2 недель.',
    'auth/invalid-uid': 'Предоставленная uidстрока должна быть непустой и содержать не более 128 символов.',
    'auth/invalid-user-import': 'Пользовательская запись для импорта недействительна.',
    'auth/maximum-user-count-exceeded': 'Превышено максимально допустимое количество пользователей для импорта.',
    'auth/missing-android-pkg-name': 'Имя пакета Android должно быть предоставлено, если требуется установить приложение Android.',
    'auth/missing-continue-uri': 'В запросе должен быть указан действительный URL продолжения.',
    'auth/missing-hash-algorithm': 'Для импорта пользователей с хэшами паролей необходимо указать алгоритм хеширования и его параметры.',
    'auth/missing-ios-bundle-id': 'В запросе отсутствует идентификатор пакета iOS.',
    'auth/missing-uid': 'uidИдентификатор необходим для текущей операции.',
    'auth/operation-not-allowed': 'Предоставленный поставщик входа отключен для вашего проекта. Обратитетсь к администратору сайта',
    'auth/phone-number-already-exists': 'Предоставленный phoneNumberуже используется существующим пользователем. Каждый пользователь должен иметь уникальный phoneNumber.',
    'auth/project-not-found': 'Не найден проект для учетных данных, использованных для инициализации SDK администратора.  Обратитетсь к администратору сайта',
    'auth/session-cookie-expired': 'Срок действия предоставленного файла cookie сеанса истек.',
    'auth/session-cookie-revoked': 'Файл cookie сеанса был отозван.',
    'auth/uid-already-exists': 'Предоставленный uid уже используется существующим пользователем. Каждый пользователь должен иметь уникальный uid.',
    'auth/unauthorized-continue-uri': 'Домен продолжения URL не находится в белом списке.',
    'auth/user-not-found': 'Не существует записи пользователя, соответствующей предоставленному идентификатору.',
    'auth/weak-password': 'Пароль должен быть не менее 6 символов',
    'auth/email-already-in-use': 'Адрес электронной почты уже используется другой учетной записью.',
    'auth/confirm-password-different': 'Пароль и подтверждение пароля отличаются.',
    'auth/wrong-password': 'Пароль неверен или у пользователя нет пароля.',
    'auth/invalid-email': 'Некорректный адрес электронной почты.'
}