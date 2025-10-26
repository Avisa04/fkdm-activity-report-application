
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import Layout from '../components/Layout';
import { toast } from 'sonner';
import { ArrowLeft, Share2, MessageCircle, Send } from 'lucide-react';

interface Report {
  id: string;
  fkdmId: string;
  fullName: string;
  bidang: string;
  instansi: string;
  hari: string;
  tanggal: string;
  jam: string;
  lokasi: string;
  jenisKegiatan: string;
  dataInfo: string;
  deskripsi: string;
  saranTL: string;
  foto?: string;
  createdAt: string;
}

export default function ViewReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem('fkdm_reports') || '[]');
    const foundReport = savedReports.find((r: Report) => r.id === id);
    setReport(foundReport || null);
  }, [id]);

  const formatReportMessage = () => {
    if (!report) return '';

    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    };

    return `${report.fullName}

${report.bidang.toUpperCase()}

${report.instansi.toUpperCase()}

Salam sobat FKDM
Izin Melaporkan:

Hari    : ${report.hari}
Tanggal : ${formatDate(report.tanggal)}
Jam     : ${report.jam}
Lokasi  : ${report.lokasi}

Jenis kegiatan : ${report.jenisKegiatan.toUpperCase()}

Data info : ${report.dataInfo}

Deskripsi : ${report.deskripsi}

Saran TL : ${report.saranTL}

FKDM
${user?.kelurahan?.toUpperCase() || 'KELURAHAN'}

Nama/Id
${report.fullName}
${report.fkdmId}`;
  };

  const shareToWhatsApp = () => {
    const message = encodeURIComponent(formatReportMessage());
    const url = `https://wa.me/?text=${message}`;
    window.open(url, '_blank');
    toast.success('Membuka WhatsApp...');
  };

  const shareToTelegram = () => {
    const message = encodeURIComponent(formatReportMessage());
    const url = `https://t.me/share/url?text=${message}`;
    window.open(url, '_blank');
    toast.success('Membuka Telegram...');
  };

  if (!report) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Laporan tidak ditemukan</p>
          <Button onClick={() => navigate('/dashboard')}>
            Kembali ke Dashboard
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali</span>
          </Button>
          
          <div className="flex space-x-2">
            <Button
              onClick={shareToWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </Button>
            <Button
              onClick={shareToTelegram}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Telegram</span>
            </Button>
          </div>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Detail Laporan Kegiatan</CardTitle>
              <Badge variant="secondary">{report.bidang}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">ID FKDM</h3>
                  <p className="text-muted-foreground">{report.fkdmId}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Nama Lengkap</h3>
                  <p className="text-muted-foreground">{report.fullName}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Bidang</h3>
                  <p className="text-muted-foreground">{report.bidang}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Instansi</h3>
                  <p className="text-muted-foreground">{report.instansi}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Hari</h3>
                  <p className="text-muted-foreground">{report.hari}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Tanggal</h3>
                  <p className="text-muted-foreground">{new Date(report.tanggal).toLocaleDateString('id-ID')}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Jam</h3>
                  <p className="text-muted-foreground">{report.jam}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Lokasi</h3>
                  <p className="text-muted-foreground">{report.lokasi}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Jenis Kegiatan</h3>
                <p className="text-muted-foreground">{report.jenisKegiatan}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Data Info</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{report.dataInfo}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Deskripsi Kegiatan</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{report.deskripsi}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Saran TL</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{report.saranTL}</p>
              </div>

              {report.foto && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Foto Kegiatan</h3>
                  <p className="text-sm text-muted-foreground">File: {report.foto}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Preview Format */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Share2 className="h-5 w-5" />
              <span>Preview Format Sharing</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 p-4 rounded-lg border border-border/30">
              <pre className="whitespace-pre-wrap text-sm text-foreground font-mono">
                {formatReportMessage()}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}