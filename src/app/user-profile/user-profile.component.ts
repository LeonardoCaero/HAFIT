import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { UserDataService } from '../services/user-data.service';
import { IUser } from '../interfaces/iuser';
import { AuthServiceService } from '../services/auth-service.service';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [AuthServiceService],
})
export class UserProfileComponent implements OnInit {
  public userProfile: any;
  model: any;
  fileName: any;
  formdata: FormData = new FormData();
  userData!: IUser;
  bioData: string = '';
  userName: string = '';
  public Editor = ClassicEditor;
  editActive = false;

  constructor(
    public auth: AuthService,
    private userService: UserDataService,
    private sanitizer: NgDompurifySanitizer,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user: User | null | undefined) => {
      if (user?.email) {
        this.userService.getUser('email', user.email).subscribe(
          (resp) => {
            if (resp.status === 200) {
              this.userData = resp.body;
              console.log('Authorized user');
            }
          },
          (error) => {
            if (error.status === 404) {
              const newUser: IUser = {
                email: user.email,
                name: user.name,
                type: 'client',
              };
              this.userService.addUser(newUser).subscribe((resp) => {
                this.userData = resp.body;
              });
            }
          }
        );
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file;
      this.formdata.append('file', file);
      this.formdata.append('upload_preset', 'plan-preset');
      this.formdata.append('cloud_name', environment.CLOUD_NAME);
    }
  }

  public onChange({ editor }: ChangeEvent) {
    this.bioData = editor.data.get();
  }

  public nameChange(data: string) {
    this.userName = data;
  }

  public onSaveBio() {
    if (this.bioData && this.bioData !== '') {
      this.userData.biography = this.bioData;
    }
    if (this.userName && this.userName !== '') {
      this.userData.name = this.userName;
    }
  
    this.userService.updateUser(this.userData).subscribe((resp) => {
      console.log(resp);
      // Actualizar userData con los datos actualizados en la respuesta
      this.userData = resp.body;
    });
  }
  

  public profileEdit() {
    if (this.editActive) {
      this.onSaveBio();
    }
    this.editActive = !this.editActive;
  }
}
