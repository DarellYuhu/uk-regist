const FAKULTAS_PRODI = {
  "01": {
    name: "Filsafat",
    prodi: {
      "01": "filsafat_agama",
    },
  },
  "02": {
    name: "Keguruan dan Ilmu Pendidikan",
    prodi: {
      "02": "pendidikan_bahasa_inggris",
      "03": "pendidikan_keagamaan_kristen",
      "04": "pendidikan_ekonomi",
    },
  },
  "03": {
    name: "Ekonomi dan Bisnis",
    prodi: {
      "01": "akuntansi",
      "02": "manajemen",
    },
  },
  "05": {
    "01": "sistem_informasi",
    "02": "informatika",
    "03": "teknologi_informasi_desain_animasi",
  },
  "06": {
    name: "Keperawatan",
    prodi: {
      "01": "keperawatan",
    },
  },
  "07": {
    name: "Arsitek",
    prodi: {
      "01": "arsitek",
    },
  },
};

function findFakultasProdi(value: string): [string, string] {
  for (const [fakultasCode, fakultas] of Object.entries(FAKULTAS_PRODI)) {
    const prodiMap = (fakultas as any).prodi ?? fakultas;
    for (const [prodiCode, prodiValue] of Object.entries(prodiMap)) {
      if (prodiValue === value) {
        return [fakultasCode, prodiCode];
      }
    }
  }
  return ["00", "00"];
}

export const generateNim = (prodi: string, latestIndex: number) => {
  const STRATA = 1;
  const STATUS = 0;
  const [fakultasCode, prodiCode] = findFakultasProdi(prodi);
  const year = new Date().getFullYear().toString().slice(-2);
  const semester = new Date().getMonth() < 6 ? "1" : "2";
  const noUrut = (latestIndex + 1).toString().padStart(3, "0");
  return `${STRATA}${fakultasCode}${prodiCode}${year}${semester}${STATUS}${noUrut}`;
};
