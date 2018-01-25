export const DefaultHeaders: any = {
    'Content-Type': 'application/json',
    'Client-Timezone-Offset': new Date().getTimezoneOffset(),
    'Token': localStorage.getItem('Token') ? localStorage.getItem('Token') : ''
};
