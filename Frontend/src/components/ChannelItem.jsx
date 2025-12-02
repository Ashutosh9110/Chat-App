
const res = await axios.get(`/channels/${id}/members`);
setMemberCount(res.data.length);