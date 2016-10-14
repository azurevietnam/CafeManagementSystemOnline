namespace CafeOnline.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("HOADON")]
    [Serializable]
    public partial class HOADON
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public HOADON()
        {
            CTHDs = new HashSet<CTHD>();
        }

        public int HoaDonID { get; set; }

        public int? SoBan { get; set; }

        public int? KhachHang { get; set; }


        public DateTime? ThoiGianVao { get; set; }

        public DateTime? ThoiGianRa { get; set; }

        public decimal? TongTien { get; set; }

        public decimal? GiamGia { get; set; }

        [StringLength(250)]
        public string GhiChu { get; set; }

        public bool? TrangThai { get; set; }


        /// <summary>
        /// 0: Da thanh toan
        /// 1: Chua in Hoa Don
        /// 2: Da in hoa don
        /// </summary>
        public int? TrangThaiHoaDon { get; set; }

        public virtual BAN BAN { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CTHD> CTHDs { get; set; }
    }
}
