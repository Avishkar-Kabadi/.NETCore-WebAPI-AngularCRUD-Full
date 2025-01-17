﻿using System.ComponentModel.DataAnnotations;

namespace InspectionApiApp
{
    public class Status
    {
        public int Id { get; set; }

        [StringLength(20)]
        public string StatusOption { get; set; } = string.Empty;

        [StringLength(50)]
        public string feedback { get; set; } = string.Empty;

    }
}