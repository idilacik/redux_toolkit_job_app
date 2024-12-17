import { v4 } from "uuid";
import AutoInput from "../components/AutoInput";
import { statusOpt, typeOpt } from "../constants";
import { toast } from "react-toastify";
import api from "../utils/api";
import { createJob } from "../app/slices/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "../components/Select";
import SubmitButton from "../components/SubmitButton";

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // form gonderildiginde
  const handleSubmit = (e) => {
    e.preventDefault();
    // formData olusturma
    const formData = new FormData(e.target);
    // inputlardaki verilerden bir nesne olusturur.

    const newJobData = Object.fromEntries(formData.entries());
    //tarih ve id ekleme
    newJobData.id = v4();
    newJobData.date = new Date().toLocaleDateString();
    // api'a yeni veriyi kaydetme
    api
      .post("/jobs", newJobData)
      // basarili olursa
      .then(() => {
        // bildirim gonder
        toast.success("iș bașarıyla eklendi");
        // store'a yeni veriyi kaydet
        dispatch(createJob(newJobData));
        // anasayfaya yonlendir
        navigate("/");
      })
      // basarisiz olursa
      .catch(() => {
        // bildirim gonder
        toast.error("iş eklenirken bir sorun oluştu");
      });
  };

  return (
    <div className="add-page">
      <section className="container">
        <h2>Yeni İş Ekle</h2>

        <form onSubmit={handleSubmit}>
          <AutoInput label={"Pozisyon"} name={"position"} />
          <AutoInput label={"Şirket"} name={"company"} />
          <AutoInput label={"Lokasyon"} name={"location"} />

          <Select label={"Durum"} options={statusOpt} name={"status"} />
          <Select label={"Tür"} options={typeOpt} name={"type"} />

          <div>
            <SubmitButton text={"oluştur"} />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
