
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import Layout from '../components/Layout';
import { toast } from 'sonner';
import { Save, Upload } from 'lucide-react';

const bidangOptions = [
  'Keamanan',
  'Ketertiban',
  'Kebersihan',
  'Kesehatan',
  'Sosial',
  'Ekonomi',
  'Pendidikan',
  'Lingkungan'
];

const instansiOptions = [
  'Polsek',
  'Koramil',
  'Puskesmas',
  'Dinas Sosial',
  'Dinas Lingkungan',
  'Kelurahan',
  'Kecamatan',
  'Satpol PP'
];

export default function CreateReport() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fkdmId: user?.fkdmId || '',
    fullName: user?.fullName || '',
    bidang: '',
    instansi: '',
    hari: '',
    tanggal: '',
    jam: '',
    lokasi: '',
    jenisKegiatan: '',
    dataInfo: '',
    deskripsi: '',
    saranTL: '',
    foto: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate unique ID
      const reportId = Date.now().toString();
      
      const newReport = {
        id: reportId,
        ...formData,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage (replace with database later)
      const existingReports = JSON.parse(localStorage.getItem('fkdm_reports') || '[]');
      const updatedReports = [newReport, ...existingReports];
      localStorage.setItem('fkdm_reports', JSON.stringify(updatedReports));

      toast.success('Laporan berhasil disimpan!');
      navigate(`/view-report/${reportId}`);
    } catch (error) {
      toast.error('Gagal menyimpan laporan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Buat Laporan Kegiatan FKDM</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fkdmId">Nomor ID FKDM</Label>
                  <Input
                    id="fkdmId"
                    value={formData.fkdmId}
                    onChange={(e) => handleInputChange('fkdmId', e.target.value)}
                    placeholder="Masukkan ID FKDM"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nama Lengkap</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Pilih Bidang</Label>
                  <Select value={formData.bidang} onValueChange={(value) => handleInputChange('bidang', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bidang" />
                    </SelectTrigger>
                    <SelectContent>
                      {bidangOptions.map((bidang) => (
                        <SelectItem key={bidang} value={bidang}>
                          {bidang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Pilih Instansi</Label>
                  <Select value={formData.instansi} onValueChange={(value) => handleInputChange('instansi', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih instansi" />
                    </SelectTrigger>
                    <SelectContent>
                      {instansiOptions.map((instansi) => (
                        <SelectItem key={instansi} value={instansi}>
                          {instansi}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hari">Hari</Label>
                  <Input
                    id="hari"
                    value={formData.hari}
                    onChange={(e) => handleInputChange('hari', e.target.value)}
                    placeholder="Senin"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanggal">Tanggal (dd/mm/yyyy)</Label>
                  <Input
                    id="tanggal"
                    type="date"
                    value={formData.tanggal}
                    onChange={(e) => handleInputChange('tanggal', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jam">Jam (hh:mm)</Label>
                  <Input
                    id="jam"
                    type="time"
                    value={formData.jam}
                    onChange={(e) => handleInputChange('jam', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lokasi">Lokasi</Label>
                <Input
                  id="lokasi"
                  value={formData.lokasi}
                  onChange={(e) => handleInputChange('lokasi', e.target.value)}
                  placeholder="Masukkan lokasi kegiatan"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jenisKegiatan">Jenis Kegiatan</Label>
                <Input
                  id="jenisKegiatan"
                  value={formData.jenisKegiatan}
                  onChange={(e) => handleInputChange('jenisKegiatan', e.target.value)}
                  placeholder="Masukkan jenis kegiatan"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataInfo">Data Info</Label>
                <Textarea
                  id="dataInfo"
                  value={formData.dataInfo}
                  onChange={(e) => handleInputChange('dataInfo', e.target.value)}
                  placeholder="Masukkan data informasi"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi Kegiatan</Label>
                <Textarea
                  id="deskripsi"
                  value={formData.deskripsi}
                  onChange={(e) => handleInputChange('deskripsi', e.target.value)}
                  placeholder="Masukkan deskripsi kegiatan"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="saranTL">Saran TL</Label>
                <Textarea
                  id="saranTL"
                  value={formData.saranTL}
                  onChange={(e) => handleInputChange('saranTL', e.target.value)}
                  placeholder="Masukkan saran TL"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="foto">Upload Foto Kegiatan</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="foto"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // In a real app, you'd upload to a server
                        handleInputChange('foto', file.name);
                      }
                    }}
                  />
                  <Upload className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {loading ? 'Menyimpan...' : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Simpan Laporan
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}